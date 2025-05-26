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

            if (result == null)
                return NotFound($"Employee with code '{code}' not found.");

            return Ok(result);
        }
    }
}
