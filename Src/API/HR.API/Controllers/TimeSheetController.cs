using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheet.Query;
using HR.Application.Features.TimeSheets.Commands.PunchIn;
using HR.Application.Features.TimeSheets.Commands.PunchOut;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        readonly IMediator _mediator;
        public TimeSheetController(IMediator mediator)
        {

            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> AddTimeSheet([FromBody] CreateTimeSheetCommand request)
        {

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTimeSheet()
        {
            var response = await _mediator.Send(new GetAllTimeSheetListQuery());
            return Ok(response);
        }

        [HttpPost("PunchIn")]
        public async Task<IActionResult> PunchIn()
        {
            var currentLogedInEmpId = 1;
            await _mediator.Send(new PunchInCommand(currentLogedInEmpId));
            return Ok("success");
        }

        [HttpPost("PunchOut")]
        public async Task<IActionResult> PunchOut()
        {
            var currentLogedInEmpId = 1;
            await _mediator.Send(new PunchOutCommand(currentLogedInEmpId));
            return Ok("success");
        }

    }
}
