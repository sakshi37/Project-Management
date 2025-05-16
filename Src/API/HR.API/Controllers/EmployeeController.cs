using HR.API.Helper;
using HR.Application.Features.Employee.Commands.CreateEmployeeMaster;
using HR.Application.Features.Employee.Queries.GetEmployeeProfile;
using HR.Application.Features.Employees.Commands.MakeEmployeeActive;
using HR.Application.Features.Employees.Commands.MakeEmployeeInactivate;
using HR.Application.Features.Employees.Commands.UpdateEmployee;
using HR.Application.Features.Employees.Queries;
using HR.Application.Features.Employees.Queries.GetAllEmployees;
using HR.Application.Features.Employees.Queries.GetEmployeeBasicDetails;
using HR.Application.Features.Employees.Queries.GetEmployeeByDesignation;
using HR.Application.Features.LoginMaster.Commands.InsertLogin;
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

            dto.Name = dto.Name.Trim();
            if (dto.Name.Length < 2) return BadRequest("Name is too short. Name must be atleast 2 char long");
            if (dto.Name.Length > 100) return BadRequest("Name is too long. Name must be atmost 100 char long");

            dto.Email = dto.Email.Trim();
            if (dto.Email.Length == 0) return BadRequest("Email is required");

            dto.SkypeId = dto.SkypeId?.Trim();
            if (dto.SkypeId.Length < 6 || dto.SkypeId.Length > 32) return BadRequest("Skype ID must be between 6 and 32 characters.");
            if (!char.IsLetter(dto.SkypeId[0])) return BadRequest("Skype ID must start with a letter.");

            dto.MobileNo = dto.MobileNo.Trim();
            if (dto.MobileNo.Length != 10) return BadRequest("Mobile No must be 10 digit");
            if (!dto.MobileNo.All(char.IsDigit)) return BadRequest("Mobile No must be in digit");

            var emailContainsAt = dto.Email.Contains('@');
            var emailContainsDot = dto.Email.Contains('.');


            if (!emailContainsAt || !emailContainsDot) return BadRequest("Email must be valid");

            var existingEmployee = await _mediator.Send(new GetEmployeeByEmailQuery(dto.Email));
            if (existingEmployee != null)
            {
                return BadRequest("Employee with that email already exists");
            }
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

        [HttpGet("EmployeeByDesignation")]
        public async Task<IActionResult> GetEmployeeByDesignationId(int did)
        {
            var query = new GetEmployeeByDesignationQuery(did);
            var employees = await _mediator.Send(query);
            return Ok(employees);
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


        [HttpPut("Update")]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeCommandDto dto)
        {
            Console.WriteLine($"[DEBUG] Received update request for Code: {dto.Code}");

            UpdateEmployeeSanitizer.Clean(dto);

            var command = new UpdateEmployeeCommand(dto);
            var result = await _mediator.Send(command);

            if (result)
            {
                Console.WriteLine($"[INFO] Update successful for {dto.Code}");
                return Ok("Employee updated successfully");
            }


            Console.WriteLine($"[WARN] Update failed for {dto.Code}");
            return BadRequest("Failed to update employee");


        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetEmployeeBasicDetailsByCode(string code)
        {
            var result = await _mediator.Send(new GetEmployeeBasicDetailsByCodeQuery(code));

            if (result == null)
                return NotFound($"Employee with code '{code}' not found.");

            return Ok(result);
        }


    }
}
