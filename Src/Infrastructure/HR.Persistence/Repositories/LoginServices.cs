using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HR.Application.Contracts;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Exceptions;
using HR.Application.Features.Employees.Dtos;
using HR.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace HR.Identity.Services
{
    public class LoginServices : ILoginService
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IMemoryCache _cache;
        private readonly JwtSettings _jwtSettings;
        private readonly IConfiguration _configuration;

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
            var hasher = new PasswordHasher<string>();
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == loginRequest.UserName);

            if (user == null)
                throw new NotFoundException($"User with username {loginRequest.UserName} does not exist");

            if (string.IsNullOrWhiteSpace(user.Email))
                throw new Exception("Email is missing for this user.");

            var isFirstLogin = user.FirstLogin ?? false;

            if (isFirstLogin)
            {
                var defaultPassword = _configuration["DefaultCredentials:DefaultPassword"];
                if (loginRequest.Password != defaultPassword)
                    throw new UserNotFoundException("Invalid credentials for first-time login.");

                var otp = GenerateRandomNumber();
                StoreOtp(user.Code, otp);
                await SendOtpMail(user.Email, otp, user.Code);

                var token = GenerateToken(user);

                return new LoginResponse
                {
                    Email = user.Email,
                    Code = user.Code,
                    Otp = otp,
                    OtpExpiryTime = DateTime.Now.AddMinutes(3),
                    FirstLogin = true,
                    UserGroupName = user.UserGroupName ?? "Unknown",
                    LoginStatus = user.LoginStatus ?? false,
                    UserCheckInTime = DateTime.Now,
                    Token = token
                };
            }
            else
            {
                var failedAttempts = $"FailedLogin:{user.Code}";

                var hashedPassword = hasher.VerifyHashedPassword(user.Code, user.Password, loginRequest.Password);
                //if (user.Password != loginRequest.Password)
                if (hashedPassword != PasswordVerificationResult.Success)
                {

                    _cache.TryGetValue(failedAttempts, out int Attempts);
                    Attempts++;


                    _cache.Set(failedAttempts, Attempts, TimeSpan.FromMinutes(10));


                    if (Attempts >= 3)
                    {
                        var blockSql = "EXEC SP_UpdateLoginStatus @EmpCode = {0}, @LoginStatus = {1}";
                        await _context.Database.ExecuteSqlRawAsync(blockSql, user.Code, false);

                        throw new Exception("User is blocked due to 3 failed login attempts.");
                    }

                    throw new UserNotFoundException($"Invalid credentials. Attempt {Attempts} of 3.");
                }
                else
                {

                    _cache.Remove(failedAttempts);
                }




                var token = GenerateToken(user);

                return new LoginResponse
                {
                    Email = user.Email,
                    Code = user.Code,
                    FirstLogin = false,
                    UserGroupName = user.UserGroupName ?? "Unknown",
                    LoginStatus = user.LoginStatus ?? false,
                    UserCheckInTime = DateTime.Now,
                    Token = token
                };
            }
        }

        // VERIFYING THE OTP AT FIRST LOGIN
        public async Task<OtpResponse> VerifyOtp(OtpRequest otpRequest)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == otpRequest.Code);
            if (user == null)
                throw new NotFoundException($"User with Username {otpRequest.Code} does not exist");

            var cacheOtp = GetOtp(user.Code);
            if (cacheOtp == null || cacheOtp != otpRequest.Otp)
                throw new OtpNotFoundException("You have entered an incorrect or expired OTP.");

            RemoveOtp(user.Code);

            var sql = "EXEC SP_ChangeFirstLoginStatus @EmpCode = {0}";
            var changeStatus = await _context.Database.ExecuteSqlRawAsync(sql, otpRequest.Code);
            if (changeStatus <= 0)
                throw new Exception("First login status has not been changed.");

            return new OtpResponse
            {
                UserName = user.Code,
                Email = user.Email,
                OtpExpiryTime = DateTime.Now.AddMinutes(3)
            };
        }




        //UPDATING THE PASSWORD AT FIRSTLOGIN

        public async Task<bool> FirstLoginPasswordUpdate(string code, string password)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == code && u.Password == null);
            if (user == null)
                throw new UserNotFoundException("User not found or not first login.");

            var hasher = new PasswordHasher<string>();
            var hashedPassword = hasher.HashPassword(code, password);

            var sql = "exec SP_UpdatePassword @Password={0}, @EmpCode = {1}";
            var result = await _context.Database.ExecuteSqlRawAsync(sql, hashedPassword, code);
            return result > 0;
        }

        public async Task<bool> SendChangePasswordOtp(string username)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == username);
            if (user == null)
                throw new UserNotFoundException("User not found");

            var otp = GenerateRandomNumber();
            StoreOtp(user.Code, otp);
            await SendOtpMail(user.Email, otp, user.Code);

            return true;
        }


        // FOROGT PASSWORD MODULE
        public async Task<bool> ChangePassword(ChangePassword changePasswordRequest)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(cp => cp.Code == changePasswordRequest.UserName);
            if (user == null)
                throw new UserNotFoundException("User not found");

            if (changePasswordRequest.NewPassword != changePasswordRequest.ConfirmNewPassword)
                throw new Exception("New and Confirm Password must be the same");


            var otpRequest = new OtpRequest
            {
                Code = changePasswordRequest.UserName,
                Otp = changePasswordRequest.Otp
            };
            var otpVerificationResult = await VerifyOtp(otpRequest);
            if (otpVerificationResult == null)
                throw new OtpNotFoundException("Invalid or expired OTP.");

            RemoveOtp(user.Code);

            var hasher = new PasswordHasher<string>();
            var hashedPassword = hasher.HashPassword(user.Code, changePasswordRequest.NewPassword);

            var result = await _context.Database.ExecuteSqlRawAsync(
                "exec SP_updateForgotPassword @Password = {0}, @EmpCode = {1}",
                hashedPassword, changePasswordRequest.UserName);

            return result > 0;
        }



        // CHANGE PASSWORD MODULE
        public async Task<bool> UpdatePassword(UpdatePasswordRequest request)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == request.UserName);
            if (user == null)
                throw new UserNotFoundException("User not found");

            var hasher = new PasswordHasher<string>();
            // Check default password case
            if (user.Password == null && request.OldPassword == _configuration["DefaultCredentials:DefaultPassword"])
            {
                var hashedPassword = hasher.HashPassword(user.Code, request.NewPassword);
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "exec SP_UpdatePassword @Password={0}, @EmpCode = {1}",
                    hashedPassword, request.UserName);

                return result > 0;
            }
            var convertPassword = hasher.VerifyHashedPassword(user.Code, user.Password, request.NewPassword);
            if (convertPassword == PasswordVerificationResult.Success)
                throw new Exception("New password can't be the same as the old one");

            if (request.NewPassword != request.ConfirmPassword)
                throw new PasswordNotMatchException("New and confirm passwords do not match");

            var newHashedPassword = hasher.HashPassword(user.Code, request.NewPassword);

            var resultUpdate = await _context.Database.ExecuteSqlRawAsync(
                "exec SP_UpdateOldPassword @Password={0}, @EmpCode = {1}, @OldPassword = {2}",
                newHashedPassword, request.UserName, user.Password);

            return resultUpdate > 0;
        }

        private string GenerateToken(employeesDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Key);

            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Sid, user.Id.ToString()),

                new Claim(ClaimTypes.Name, user.Code),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserGroupName ?? "User"),
                new Claim("jti", DateTime.Now.ToString()),
                new Claim("sub", user.Code),
                new Claim("iss", user.Email),
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

        private string GenerateRandomNumber() =>
            new Random().Next(1000, 9999).ToString("D4");

        private string GenerateEmailBody(string name, string otpText)
        {
            return $"<div style='width:100%;background-color:yellow'><h1>Hi {name}, Thanks for Signing Up</h1><h2>Please enter the OTP to complete login verification.</h2><h2>OTP: {otpText}</h2></div>";
        }

        public void StoreOtp(string userName, string otp)
        {
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3));
            _cache.Set(userName, otp, cacheOptions);
        }

        public string? GetOtp(string userName) =>
            _cache.TryGetValue(userName, out string? otp) ? otp : null;

        public void RemoveOtp(string userName) =>
            _cache.Remove(userName);

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
    }
}
