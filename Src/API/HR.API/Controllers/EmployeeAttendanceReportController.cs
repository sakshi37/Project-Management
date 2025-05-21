using HR.Application.Features.EmployeeAttendanceReports.Query;
using HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByDivisionNames;
using HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByEmployeeName;
using HR.Application.Features.EmployeeAttendanceReports.Query.GetAllEmployeeAttendanceReports;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAttendanceReportController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EmployeeAttendanceReportController(IMediator mediator)
        {
         _mediator = mediator;   
        }
        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            var AttendanceReport = await _mediator.Send(new GetAllEmployeeAttendanceReportQuery());
            return Ok(AttendanceReport);
        }

        [HttpGet("DivisionName")]
        public async Task<IActionResult> GetAllDivisionName(string divisionName)
        {
            var AttendanceReport = await _mediator.Send(new GetAllEARDivisionNameQuery(divisionName));
            return Ok(AttendanceReport);
        }

        [HttpGet("EmployeeName")]
        public async Task<IActionResult> GetAllEmployeeName(string employeeName)
        {
            var EmployeeName = await _mediator.Send(new GetAllByEmployeeNamequery(employeeName));
            return Ok(EmployeeName);
        }
    }
}
