using Dapper;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Exceptions;
using HR.Application.Features.Employees.Dtos;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Data;
using System.Data.Common;
using System.Text;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace HR.Identity.Services
{
    public class LoginServices : ILoginService
    {
        readonly AppDbContext _context;
        readonly IEmailService _emailService;
        private readonly IMemoryCache _cache;

        public LoginServices(AppDbContext context, IEmailService emailService, IMemoryCache cache)
        {
            _context = context;
            _emailService = emailService;
            _cache = cache;
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
            //var otplogin =await _context.Tbl_LoginMaster.FirstOrDefaultAsync(ol=>ol.FirstLogin==);

            //var status = await _context.Tbl_LoginMaster.FirstOrDefaultAsync(s => s.LoginStatus == loginRequest.LoginStatus);
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
                    LoginStatus=user.LoginStatus,
                    UserCheckInTime = DateTime.Now,
                    fk_EmpId=user.fk_EmpId


        //EmpId = user.fk_EmpId
    };

                return response;
            }
            else
            {
                // Return login response without OTP
                var response = new LoginResponse
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    FirstLogin = user.FirstLogin,
                    RoleName = user.RoleName,
                    LoginStatus = user.LoginStatus,
                    UserCheckInTime = DateTime.Now,
                    fk_EmpId = user.fk_EmpId

                    //Otp = null,
                    //OtpExpiryTime = DateTime.Now.
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

        //   Send OTP for changing password
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
                throw new Exception("Entered Password should be as nsame as existing Password");
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



        public async Task<empdetailDto> GetByIdAsync(int id)
        {
            var sql = "SELECT Code, Name, Email FROM Tbl_Employee_master WHERE Id = {0}";
            var result = await _context
                .EmpdetailDtos
                .FromSqlRaw(sql, id)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            return result;
        }



        public async Task<string> InsertLoginAsync(int empId, int createdBy)
        {
            var employee = await GetByIdAsync(empId);
            if (employee == null)
                throw new Exception("Employee not found");

            var userName = employee.Code ?? "";
            var employeeName = employee.Name ?? "";

            var last3Code = userName.Length >= 3 ? userName[^3..] : userName;
            var namePart = employeeName.Length >= 4 ? employeeName.Substring(0, 4) : employeeName;
            var plainPassword = $"{namePart}@{last3Code}";

            var encryptedPassword = Encoding.UTF8.GetBytes(plainPassword);

            var parameters = new[]
            {
            new SqlParameter("@EmpId", empId),
            new SqlParameter("@CreatedBy", createdBy),
            new SqlParameter("@Password", System.Data.SqlDbType.VarBinary, encryptedPassword.Length)
            {
                Value = encryptedPassword
            }
        };

            await _context.Database.ExecuteSqlRawAsync("EXEC SP_InsertLog @EmpId, @CreatedBy, @Password", parameters);

            return plainPassword;
        }
    }

}
