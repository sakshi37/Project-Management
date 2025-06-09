using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Exceptions;
using HR.Application.Features.Employees.Dtos;
using HR.Persistence.Context;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.SharePoint.Client;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase 
    {
        readonly ILoginService _loginService;
        readonly IMediator _mediator;
        private readonly AppDbContext _context;


        public LoginController(ILoginService loginService, IMediator mediator, AppDbContext context)
        {
            _loginService = loginService;
            _mediator = mediator;
            _context = context;

        }


        //login first
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(Tbl_LoginMasterDto tbloginRequest)
        {
            var response = await _loginService.Login(tbloginRequest);
            return Ok(response);
        }

        //verfying otp got on mail
        [HttpPost("otpVerify-for-first-login")]
        public async Task<ActionResult<OtpResponse>> VerifyOtp([FromBody] OtpRequest otpRequest)
        {
            if (otpRequest == null || string.IsNullOrWhiteSpace(otpRequest.Code) || string.IsNullOrWhiteSpace(otpRequest.Otp))
            {
                return BadRequest("OTP request is invalid. 'Code' and 'Otp' are required.");
            }

            try
            {
                var response = await _loginService.VerifyOtp(otpRequest);
                return Ok(response);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (OtpNotFoundException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during OTP verification.", detail = ex.Message });
            }
        }

        [HttpPut("FirstLoginUpdatePassword")]
        public async Task<IActionResult> FirstLoginPasswordUpdate(string Code, string Password)
        {
            var result =await _loginService.FirstLoginPasswordUpdate(Code, Password);
            return Ok(result);

        }


        //again sending otp for changing the password
        [HttpPost("send-otp for forgot password")]
        public async Task<IActionResult> SendOtpToEmail(string username)
        {
            try
            {
                await _loginService.SendChangePasswordOtp(username);

                return Ok(new { message = "OTP has been sent to your email address." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // verifying the otp and chnaging the password if the otp is correct
        private static readonly Dictionary<string, int> _passwordChangeTracker = new();
        private static readonly int MaxPasswordChangesPerDay = 3;

        [HttpPost("Forgot Password")]
        public async Task<IActionResult> VerifyOtpAndChangePassword(ChangePassword changePasswordRequest)
        {
            try
            {
                if (_passwordChangeTracker.ContainsKey(changePasswordRequest.UserName) && _passwordChangeTracker[changePasswordRequest.UserName] >= MaxPasswordChangesPerDay)
                {
                    return BadRequest("You have reached the maximum number of password changes allowed for today.");
                }

                bool isPasswordChanged = await _loginService.ChangePassword(changePasswordRequest);

                foreach (var cookieKey in Request.Cookies.Keys)
                {
                    Response.Cookies.Delete(cookieKey);
                }
                if (isPasswordChanged)
                {
                    if (_passwordChangeTracker.ContainsKey(changePasswordRequest.UserName))
                    {
                        _passwordChangeTracker[changePasswordRequest.UserName]++;
                    }
                    else 
                    {
                        _passwordChangeTracker[changePasswordRequest.UserName] = 1;
                    }
                    Console.WriteLine(_passwordChangeTracker[changePasswordRequest.UserName]);
                    return Ok(new { message = "Password changed successfully!!!" });
                }
                else
                {
                    return BadRequest(new { message = "OTP verification failed." });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
           
        }


        //update password
        [HttpPost("change_password")]
        public async Task<IActionResult> UpdatePasswrd(UpdatePasswordRequest updatePasswordRequest)
        {
            var result = await _loginService.UpdatePassword(updatePasswordRequest);
            if (!result)
            {
                return BadRequest("Password update failed. Check your input and try again.");
            }
            return Ok("Password Updated Successfully");
        }


        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var employees = await _context.employeesDto
                .FromSqlRaw("exec SP_GetAllEmployeeforLogin")
                .ToListAsync();

            var user = employees.FirstOrDefault(u => u.Code == username);
            if (user == null)
                return NotFound();
             
            return Ok(new { firstLogin = user.FirstLogin });
        }

    }
}