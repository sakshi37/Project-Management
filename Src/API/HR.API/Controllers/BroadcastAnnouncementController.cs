using HR.Application.Features.Annoucements.Commands.CreateBroadcastAnnoucement;
using HR.Application.Features.Annoucements.Dtos;
using HR.Application.Features.Annoucements.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BroadcastAnnouncementController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BroadcastAnnouncementController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BroadcastAnnouncementDto dto)
        {
            var result = await _mediator.Send(new CreateBroadcastAnnouncementCommand(dto));
            return Ok(new { message = result });
        }
        [HttpGet("today")]
        public async Task<ActionResult<List<BroadcastAnnouncementDto>>> GetTodayAnnouncements()
        {
            var announcements = await _mediator.Send(new GetTodayAnnouncementsQuery());
            return Ok(announcements);
        }

        [HttpGet("get-by-user")]
        public async Task<IActionResult> GetAnnouncementsForUser([FromQuery] GetAnnouncementsForUserDTO dto)
        {
            var result = await _mediator.Send(new GetAnnouncementsForUserQuery(dto));
            return Ok(result);
        }

    }

}
