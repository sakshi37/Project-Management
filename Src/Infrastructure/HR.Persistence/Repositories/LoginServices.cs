using Dapper;
using HR.Application.Contracts;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Exceptions;
using HR.Domain.Entities;
using HR.Identity.Models;
using HR.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HR.Identity.Services
{
    public class LoginServices : ILoginService
    {
        readonly AppDbContext _context;
        readonly IEmailService _emailService;
        private readonly IMemoryCache _cache;
        readonly JwtSettings _jwtSettings;
        //readonly UserManager<ApplicationUser> _userManager;
        //readonly SignInManager<ApplicationUser> _signInManger;

        public LoginServices(AppDbContext context, IEmailService emailService, IMemoryCache cache, IOptions<JwtSettings> jwtOptions/*, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManger*/)
        {
            _context = context;
            _emailService = emailService;
            _cache = cache;
            _jwtSettings = jwtOptions.Value;
            //_userManager = userManager;
            //_signInManger = signInManger;
        }

        public async Task<LoginResponse> Login(Tbl_LoginMasterDto loginRequest)
        {
            var user = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(u => u.UserName == loginRequest.UserName);
            if (user == null)
            {
                throw new NotFoundException($"User with username {loginRequest.UserName} does not exist");
            }

            var passwordCheck = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(u => u.UserName == loginRequest.UserName && u.Password == loginRequest.Password);
            if (passwordCheck == null)
            {
                throw new UserNotFoundException("Invalid credentials, please try again!!");
            }
            Console.WriteLine(user.UserName);
            // Generate JWT token on successful login (not first login)
            var token = GenerateToken(user);

            if (user.FirstLogin)
            {
                var otp = GenerateRandomNumber();
                StoreOtp(user.UserName, otp);
                await SendOtpMail(user.Email, otp, user.UserName);

                var response = new LoginResponse
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    Otp = otp,
                    OtpExpiryTime = DateTime.Now.AddMinutes(3),
                    FirstLogin = user.FirstLogin,
                    RoleName = user.RoleName,
                    LoginStatus = user.LoginStatus,
                    UserCheckInTime = DateTime.Now,
                    fk_EmpId = user.fk_EmpId,
                    Token = token
                };

                return response;
            }
            else
            {

                var response = new LoginResponse
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    FirstLogin = user.FirstLogin,
                    RoleName = user.RoleName,
                    LoginStatus = user.LoginStatus,
                    UserCheckInTime = DateTime.Now,
                    fk_EmpId = user.fk_EmpId,
                    Token = token
                };

                return response;
            }
        }

        public async Task SendOtpMail(string useremail, string otpText, string name)
        {
            var mailRequest = new MailRequest
            {
                Email = useremail,
                Subject = "Thanks for Verifying : OTP",
                EmailBody = GenerateEmailBody(name, otpText)
            };
            await _emailService.SendEmail(mailRequest);
        }

        private string GenerateEmailBody(string name, string otpText)
        {
            string emailBody = string.Empty;
            emailBody = "<div style='width:100%;background-color:yellow'>";
            emailBody += $"<h1>Hi {name}, Thanks for Signing Up</h1>";
            emailBody += "<h2>Please enter the OTP to complete login verification.</h2>";
            emailBody += $"<h2>OTP: {otpText}</h2>";
            emailBody += "</div>";
            return emailBody;
        }

        private string GenerateRandomNumber()
        {
            Random random = new Random();
            string randomNo = random.Next(1000, 9999).ToString("D4");
            return randomNo;
        }

        public void StoreOtp(string userName, string otp)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3));
            _cache.Set(userName, otp, cacheEntryOptions);
        }

        public string? GetOtp(string userName)
        {
            _cache.TryGetValue(userName, out string? otp);
            return otp;
        }

        public async Task<OtpResponse> VerifyOtp(OtpRequest otpRequest)
        {
            var user = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(u => u.UserName == otpRequest.UserName);
            if (user == null)
            {
                throw new NotFoundException($"User with Username {otpRequest.UserName} does not exist");
            }

            var cacheOtp = GetOtp(user.UserName);
            if (cacheOtp == null || cacheOtp != otpRequest.Otp)
            {
                throw new OtpNotFoundException("You have entered an incorrect or expired OTP.");
            }

            // Remove the OTP from cache
            RemoveOtp(user.UserName);

            // Marking user as no longer first-time
            if (user.FirstLogin)
            {
                user.FirstLogin = false;
                _context.Tbl_LoginMaster.Update(user);
                await _context.SaveChangesAsync();
            }

            var response = new OtpResponse
            {
                UserName = user.UserName,
                Email = user.Email,
                OtpExpiryTime = DateTime.Now.AddMinutes(3)
            };

            return response;
        }

        public void RemoveOtp(string userName)
        {
            _cache.Remove(userName);
        }
        // Send OTP for changing password
        public async Task<bool> SendChangePasswordOtp(string username)
        {
            var user = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                throw new UserNotFoundException("User not found");
            }

            var otp = GenerateRandomNumber();
            StoreOtp(user.UserName, otp);
            await SendOtpMail(user.Email, otp, user.UserName);

            return true;
        }

        // forgot password module
        public async Task<bool> ChangePassword(ChangePassword changePasswordRequest)
        {
            var user = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(cp => cp.UserName == changePasswordRequest.UserName);
            if (user == null)
            {
                throw new UserNotFoundException("User with this username not found");
            }

            var otpRequest = new OtpRequest
            {
                UserName = changePasswordRequest.UserName,
                Otp = changePasswordRequest.Otp
            };

            var otpVerificationResult = await VerifyOtp(otpRequest);

            if (otpVerificationResult == null)
            {
                throw new OtpNotFoundException("Invalid or expired OTP.");
            }

            if (changePasswordRequest.NewPassword != changePasswordRequest.ConfirmNewPassword)
            {
                throw new Exception("New and Confirm Password must be the same");
            }

            var hasher = new PasswordHasher<Tbl_LoginMaster>();
            var hashedPassword = hasher.HashPassword(user, changePasswordRequest.NewPassword);

            user.Password = changePasswordRequest.NewPassword;

            _context.Tbl_LoginMaster.Update(user);
            await _context.SaveChangesAsync();

            RemoveOtp(user.UserName);

            return true;



           
        }

        // change password module

        public async Task<bool> UpdatePassword(UpdatePasswordRequest updatePasswordRequest)
        {
            

                var user = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(u => u.UserName == updatePasswordRequest.UserName);
                if (user == null)
                {
                    throw new UserNotFoundException("user with this username is not exist");
                }

                if (user.FirstLogin)
                {
                    throw new Exception("You are New User Try with your Default Password Provided");
                }

                if (updatePasswordRequest.NewPassword == updatePasswordRequest.OldPassword)
                {
                    throw new Exception("New password Can't be as same as older one ");
                }

                if (updatePasswordRequest.OldPassword != user.Password)
                {
                    throw new Exception("Entered Password should be as same as existing Password");
                }

                if (updatePasswordRequest.NewPassword != updatePasswordRequest.ConfirmPassword)
                {
                    throw new PasswordNotMatchException("“Old password types are wrong");
                }
                user.Password = updatePasswordRequest.NewPassword;
                _context.Tbl_LoginMaster.Update(user);
                await _context.SaveChangesAsync();

                return true;
            
           
        }

        public async Task InsertLoginAsync(int empId, int createdBy)
        {
            var employee = await _context.Tbl_Employee_master
                .Where(e => e.Id == empId)
                .Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Code,
                    e.Email
                })
                .FirstOrDefaultAsync();

            if (employee == null)
                throw new Exception("Employee not found");

            var userName = employee.Code;
            var email = employee.Email;
            var employeeName = employee.Name;

            var last3Code = userName.Length >= 3 ? userName[^3..] : userName;
            var namePart = employeeName.Length >= 4 ? employeeName.Substring(0, 4) : employeeName;
            var plainPassword = namePart + "@" + last3Code;

            var encryptedPassword = Encoding.UTF8.GetBytes(plainPassword);

            var maxLoginId = await _context.Tbl_Login.MaxAsync(l => (int?)l.pk_LoginId) ?? 0;

            var login = new Tbl_Login
            {
                pk_LoginId = maxLoginId + 1,
                fk_EmpId = empId,
                UserName = userName,
                Password = encryptedPassword,
                CreatedDate = DateTime.UtcNow,
                Email = email,
                FirstLogin = true,
                RoleName = "User"
            };

            _context.Tbl_Login.Add(login);
            await _context.SaveChangesAsync();
        }

        private string GenerateToken(Tbl_LoginMaster user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Key);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleName ?? "User"),
                new Claim("sub", user.UserName),
                new Claim("fk_EmpId", user.fk_EmpId.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
