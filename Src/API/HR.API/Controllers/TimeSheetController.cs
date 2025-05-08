using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheet.Query;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        readonly IMediator _meditor;
        public TimeSheetController(IMediator mediator)
        {

            _meditor = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> AddTimeSheet([FromBody] CreateTimeSheetCommand request)
        {

            var response = await _meditor.Send(request);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTimeSheet()
        {
            var response = await _meditor.Send(new GetAllTimeSheetListQuery());
            return Ok(response);
        }
    }
}
