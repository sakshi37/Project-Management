using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Dtos;
using HR.Application.Features.LoginMaster.Commands.InsertLogin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [HttpPost("otpVerify")]
        public async Task<ActionResult<OtpResponse>> VerifyOtp(OtpRequest otpRequest)
        {
            var response = await _loginService.VerifyOtp(otpRequest);
            return Ok(response);
        }


        //again sending otp for changing the password
        [HttpPost("send-otp")]
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

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtpAndChangePassword(ChangePassword changePasswordRequest)
        {
            try
            {

                bool isPasswordChanged = await _loginService.ChangePassword(changePasswordRequest);

                if (isPasswordChanged)
                {
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
        [HttpPost("update_password")]
        public async Task<IActionResult> UpdatePasswrd(UpdatePasswordRequest updatePasswordRequest)
        {
            var result = await _loginService.UpdatePassword(updatePasswordRequest);
            if (!result)
            {
                return BadRequest("Password update failed. Check your input and try again.");
            }
            return Ok("Password Updated Successfully");
        }




        [HttpPost("insert-log")]
        public async Task<IActionResult> InsertLog([FromBody] InsertLoginCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { Message = "Login inserted successfully" });
        }
    }
}