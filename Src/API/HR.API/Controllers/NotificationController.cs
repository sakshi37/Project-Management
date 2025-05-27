using HR.Application.Features.Notification.Commands.ReadAndDeleteNotification;
using HR.Application.Features.Notification.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly IMediator _mediator;

        public NotificationController(IMediator mediator) { 
            _mediator = mediator;
        }

        [HttpGet("{code}")]


        public async Task<IActionResult> GetNotificationByCode(string code)
        {
            var result = await _mediator.Send(new GetNotificationByCodeQuery(code));

            if (result == null || result.Count == 0)
                return NotFound($"No notifications found for employee with code '{code}'.");

            return Ok(result);
        }
        [HttpPut("DeletAndReadNotification")]
        public async Task<IActionResult> DeleteReadNotification(int notificationId)
        {
           var result =await _mediator.Send(new ReadAndDeleteNotificationCommand (notificationId));
            if (result > 0)
            {
                return Ok(new { message = "Notification deleted successfully" });
            }
            else
            {
                return NotFound(new { message = "Notification not found or already deleted" });
            }

        }

    }
}
