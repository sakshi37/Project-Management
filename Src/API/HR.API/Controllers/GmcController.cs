using HR.Application.Features.Employees.Commands.InsertEmployeeDetailsGmc;
using HR.Application.Features.Employees.Queries.GetEmployeeBasicDetails;
using HR.Application.Features.Family.Commands.AddFamilyDetails;
using HR.Application.Features.Family.Queries.GetAllFamilyType;
using HR.Application.Features.Family.Queries.GetFamilyDetailsByCode;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace HR.API.Controllers
{
  
 [ApiController]
 [Route("api/[controller]")]
    public class GmcController : Controller
    {
        private readonly IMediator _mediator;

        public GmcController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("AddGmcDetails")]
       
        public async Task<IActionResult> AddGmcDetails([FromBody] InsertEmployeeDetailsGmcCommandDto dto)
        {
            var result = await _mediator.Send(new InsertEmployeeDetailsGmcCommand(dto));
            return result ? Ok(new { message = "Employee updated." }) : NotFound(new { message = "Employee not found."});

        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFamilyMember([FromBody] AddFamilyDetailsCommandDto dto)
        {
            

          
            try
            {
                var command = new AddFamilyDetailsCommand(dto);
                var result = await _mediator.Send(command); if (result)
                    return Ok(new { message = "Family member added successfully." });

                return BadRequest(new { message = "Failed to add family member." });
            }
            catch (InvalidOperationException ex)
            {
                // Return user-friendly message from service
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                // Return fallback error
                return StatusCode(500, new { message = "Something went wrong. Please try again later." });
            }
        }
        [HttpGet("FamilyMember")]
        public async Task<IActionResult> GetAll()
          => Ok(await _mediator.Send(new GetAllFamilyDetailsByCodeVm()));

        [HttpGet("familydetails/{code}")]
        public async Task<IActionResult> GetFamilyDetails(string code)
        {
            var result = await _mediator.Send(new GetFamilyDetailsByCodeQuery(code));
            return Ok(result);
        }
    }
}

