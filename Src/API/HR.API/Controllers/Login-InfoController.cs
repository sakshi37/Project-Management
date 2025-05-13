using HR.Application.Contracts.Models.Persistence;
using HR.Persistence.Context;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Login_InfoController : ControllerBase
    {
         private readonly AppDbContext _context;
        public Login_InfoController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("get-checkin-time/{username}")]
        public async Task<IActionResult> GetCheckInTime(string username)
        {
            var user = await _context.Tbl_LoginMaster
                .FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
                return NotFound($"User '{username}' not found.");

            return Ok(new
            {
                user.UserName,
                user.UserCheckInTime
            });
        }

        [HttpPost("set-checkin-time/{username}")]
        public async Task<IActionResult> SetCheckInTime(string username)
        {
            var user = await _context.Tbl_LoginMaster
                .FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
                return NotFound($"User '{username}' not found.");

            user.UserCheckInTime = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "User check-in time updated successfully.",
                user.UserCheckInTime
            });
        }

    }
}
