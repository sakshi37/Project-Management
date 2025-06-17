using HR.Broadcast.API.Features.Commands;
using HR.Broadcast.API.Features.Dtos;
using HR.Broadcast.API.Features.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.Broadcast.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BroadcastController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BroadcastController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AnnouncementDto dto)
        {
            var result = await _mediator.Send(new CreateBroadcastCommand(dto));
            return Ok(new { message = result });
        }
        [HttpGet("today")]
        public async Task<ActionResult<List<AnnouncementDto>>> GetTodayAnnouncements()
        {
            var announcements = await _mediator.Send(new GetAnnouncementQuery());
            return Ok(announcements);
        }
        [HttpGet("get-by-user")]
        public async Task<IActionResult> GetAnnouncementsForUser([FromQuery] GetAnnouncementsForUserDTO dto)
        {
            var result = await _mediator.Send(new GetAnnouncementsForUserQuery(dto));
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateAnnouncement(UpdateAnnouncementCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new { message = result });
        }


    }
}
