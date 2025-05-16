using HR.Application.Contracts;
using HR.Application.Features.DailyReport.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyReportController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DailyReportController(IMediator mediator)
        {
            _mediator=mediator;
        }

        [HttpPost("DailyReports")]
        public async Task<IActionResult>GetDailyReport(DailyReportrequest request)
        {
            var query=new GetAllDailyReportQuery(request);
            var result =await _mediator.Send(query);
            return Ok(result);
        }

    }
}
