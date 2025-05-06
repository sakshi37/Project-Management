using HR.Application.Features.Employee.Commands.CreateEmployeeMaster;
using HR.Application.Features.Employee.Commands.Query;
using HR.Application.Features.Employee.Queries.GetEmployeeProfile;
using HR.Application.Features.Employees.Commands.MakeEmployeeActive;
using HR.Application.Features.Employees.Commands.MakeEmployeeInactivate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        readonly IMediator _mediator;
        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] CreateEmployeeMasterDto dto)
        {
            Console.WriteLine(dto);
            var response = await _mediator.Send(new CreateEmployeeCommand(dto));
            return Ok(response);
        }


        [HttpGet("AllEmployees")]
        public async Task<IActionResult> GetEmployees([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var query = new GetAllEmployeeQuery { PageNumber = pageNumber, PageSize = pageSize };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [HttpGet("ProfileDetalis/{code}")]
        public async Task<IActionResult> GetEmployeeProfile(string code)
        {
            var query = new GetEmployeeProfileQuery(code);
            var employeeProfile = await _mediator.Send(query);

            if (employeeProfile == null)
            {
                return NotFound();
            }

            return Ok(employeeProfile);
        }
        [HttpPost("Inactivate/{code}")]
        public async Task<IActionResult> InactivateEmployee(string code)
        {
            code = code?.Trim();// to trim the extra space or tabs
            var result = await _mediator.Send(new MakeEmployeeInactiveCommand(code));
            return Ok(new { message = result });
        }
        [HttpPut("Activate/{code}")]
        public async Task<IActionResult> ActivateEmployee(string code)
        {
            code = code?.Trim();// to trim the extra space or tabs
            var result = await _mediator.Send(new MakeEmployeeActiveCommand(code));
            return Ok(new { message = result });
        }



        //[HttpGet]
        //public async Task<IActionResult> GetAllEmployee()
        //{
        //    var response = await _mediator.Send(new GetAllEmployeeQuery());
        //    return Ok(response);

        //}
    }
}
