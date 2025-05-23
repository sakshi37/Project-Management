using Dapper;
using HR.Application.Contracts;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Exceptions;
using HR.Application.Features.Employee.Dtos;
using HR.Application.Features.Employees.Dtos;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
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
        readonly IMemoryCache _cache;
        readonly JwtSettings _jwtSettings;
        readonly IConfiguration _configuration;
        private string Code;

        public LoginServices(AppDbContext context, IEmailService emailService, IMemoryCache cache, IOptions<JwtSettings> jwtOptions, IConfiguration configuration)
        {
            _context = context;
            _emailService = emailService;
            _cache = cache;
            _jwtSettings = jwtOptions.Value;
            _configuration = configuration;

        }
        public async Task<LoginResponse> Login(Tbl_LoginMasterDto loginRequest)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == loginRequest.UserName);

            if (user == null)
                throw new NotFoundException($"User with username {loginRequest.UserName} does not exist");

            var defaultPassword = _configuration["DefaultCredentials:DefaultPassword"];
            bool passwordMatch = user.Password == loginRequest.Password || loginRequest.Password == defaultPassword;

            if (!passwordMatch)
                throw new UserNotFoundException("Invalid credentials, please try again!!");

            // Null-safe property access
            if (string.IsNullOrWhiteSpace(user.Email))
                throw new Exception("Email is missing for this user.");

            var token = GenerateToken(user);

            if (user.FirstLogin ?? false)
            {
                var otp = GenerateRandomNumber();
                StoreOtp(user.Code, otp);
                await SendOtpMail(user.Email, otp, user.Code);

                return new LoginResponse
                {
                    Email = user.Email,
                    Code = user.Code,
                    Otp = otp,
                    OtpExpiryTime = DateTime.Now.AddMinutes(3),
                    FirstLogin = user.FirstLogin ?? false,
                    UserGroupName = user.UserGroupName ?? "Unknown",
                    LoginStatus = user.LoginStatus ?? false,
                    UserCheckInTime = DateTime.Now,
                    Token = token
                };
            }
            else
            {
                return new LoginResponse
                {
                    Email = user.Email,
                    Code = user.Code,
                    FirstLogin = user.FirstLogin ?? false,
                    UserGroupName = user.UserGroupName ?? "Unknown",
                    LoginStatus = user.LoginStatus ?? false,
                    UserCheckInTime = DateTime.Now,
                    Token = token
                };
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
            var user = await _context.employeesDto.FirstOrDefaultAsync(u => u.Code == otpRequest.Code);
            if (user == null)
            {
                throw new NotFoundException($"User with Username {otpRequest.Code} does not exist");
            }

            var cacheOtp = GetOtp(user.Code);
            if (cacheOtp == null || cacheOtp != otpRequest.Otp)
            {
                throw new OtpNotFoundException("You have entered an incorrect or expired OTP.");
            }

            // Remove the OTP from cache
            RemoveOtp(user.Code);

            // Marking user as no longer first-time
            if (user.FirstLogin.HasValue && user.FirstLogin.Value)
            {
                user.FirstLogin = false;
                var empUser = new employeesDto
                {
                    Code = user.Code,
                    Email = user.Email,
                    UserGroupName = user.UserGroupName,
                    LoginStatus = user.LoginStatus,
                    Password = user.Password
                };
                _context.employeesDto.Update(empUser);
                await _context.SaveChangesAsync();
            }

            var response = new OtpResponse
            {
                UserName = user.Code,
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
            var user = await _context.Employees.FirstOrDefaultAsync(u => u.Code == Code);
            if (user == null)
            {
                throw new UserNotFoundException("User not found");
            }

            var otp = GenerateRandomNumber();
            StoreOtp(user.Code, otp);
            await SendOtpMail(user.Email, otp, user.Code);

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
                Code = changePasswordRequest.UserName,
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

        private string GenerateToken(employeesDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Key);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Code),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Convert.ToString(user.UserGroupName) ?? "User"),
                new Claim("sub", user.Code),
                new Claim("iss",user.Email),
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
