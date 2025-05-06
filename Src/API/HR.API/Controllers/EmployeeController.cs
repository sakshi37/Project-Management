using HR.Application.Features.Employee.Commands.CreateEmployeeMaster;
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

            var emailContainsAt = dto.Email.Contains('@');
            var emailContainsDot = dto.Email.Contains('.');


            if (!emailContainsAt || !emailContainsDot) return BadRequest("Email must be valid");


            var response = await _mediator.Send(new CreateEmployeeCommand(dto));
            return Ok(response);
        }






        //[HttpGet]
        //public async Task<IActionResult> GetAllEmployee()
        //{
        //    var response = await _mediator.Send(new GetAllEmployeeQuery());
        //    return Ok(response);

        //}
    }
}
