using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Features.Employees.Dtos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SharePoint.Client;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase 
    {
        readonly ILoginService _loginService;
        private readonly IMediator _mediator;


        public LoginController(ILoginService loginService, IMediator mediator)
        {
            _loginService = loginService;
            _mediator = mediator;

        }


        //login first
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(Tbl_LoginMasterDto tbloginRequest)
        {
            var response = await _loginService.Login(tbloginRequest);
            return Ok(response);
        }

        //verfying otp got on mail
        [HttpPost("otpVerify for first login")]
        public async Task<ActionResult<OtpResponse>> VerifyOtp(OtpRequest otpRequest)
        {
            var response = await _loginService.VerifyOtp(otpRequest);
            return Ok(response);
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


       

        //[HttpPost("insert-login")]
       
        //public async Task<IActionResult> InsertLogin([FromBody] InsertLoginCommand command)
        //{
        //    await _mediator.Send(command);
        //    return Ok("Login inserted successfully.");
        //}
    }
}