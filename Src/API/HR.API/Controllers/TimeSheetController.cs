using HR.Application.Features.TimeSheet.Commands.CreateTimeSheet;
using HR.Application.Features.TimeSheet.Query;
using HR.Application.Features.TimeSheets.Commands.PunchIn.Commands;
using HR.Application.Features.TimeSheets.Commands.PunchIn.Queries;
using HR.Application.Features.TimeSheets.Commands.PunchOut;
using HR.Application.Features.TimeSheets.Queries;
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

        [HttpGet("GetAllTimeSheet")]
        public async Task<IActionResult> GetAllTimeSheet()
        {
            var response = await _mediator.Send(new GetAllTimeSheetListQuery());
            return Ok(response);
        }

        [HttpGet("GetAllAttendance")]
        public async Task<IActionResult> GetAllAttendance()
        {
            var response = await _mediator.Send(new GetAllAttendanceListQuery());
            return Ok(response);
        }

        [HttpPost("PunchIn")]
        public async Task<IActionResult> PunchIn([FromBody] AttendanceDto attendanceDto)
        {
            var currentLoggedInEmpId = attendanceDto.EmpId;
            await _mediator.Send(new PunchInCommand(currentLoggedInEmpId));
            return Ok();
        }

        [HttpPost("PunchOut")]
        public async Task<IActionResult> PunchOut([FromBody] AttendanceDto attendanceDto)
        {
            var currentLoggedInEmpId = attendanceDto.EmpId;
            await _mediator.Send(new PunchOutCommand(currentLoggedInEmpId));
            return Ok();
        }
        [HttpGet("{empId}")]
        public async Task<IActionResult> getSessionByEmpId(int empId)
        {
            var currentLoggedIn = empId;
            var session = await _mediator.Send(new GetSessionByEmpQuery(currentLoggedIn));
            return Ok(session);
        }



    }
}
