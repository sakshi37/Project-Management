using HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails;
using HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    public class AttendanceController : Controller
    {
        private readonly IMediator _mediator;
        public AttendanceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("miss-punch-out")]
        public async Task<IActionResult> GetMissPunchOutReport([FromQuery] DateTime startDate)
        {
            var result = await _mediator.Send(new MissPunchOutQuery { StartDate = startDate });

            if (result == null || !result.Any())
            {
                return NotFound("No report found for the selected date.");
            }

            return Ok(result);
        }


        [HttpGet("miss-punch-in")]
        public async Task<IActionResult> GetMissPunchInReport([FromQuery] DateTime startDate)
        {
            var result = await _mediator.Send(new MissPunchInQuery { StartDate = startDate });

            if (result == null || !result.Any())
            {
                return NotFound("No report found for the selected date.");
            }

            return Ok(result);
        }
    }
}
