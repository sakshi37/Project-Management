using HR.Application.Features.Family.Commands.AddFamilyDetails;
using HR.Application.Features.Family.Queries.GetAllFamilyType;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("add")]
        public async Task<IActionResult> AddFamilyMember([FromBody] AddFamilyDetailsCommandDto dto)
        {
            var command = new AddFamilyDetailsCommand(dto);
            var result = await _mediator.Send(command);

            if (result)
                return Ok(new { message = "Family member inserted successfully." });

            return BadRequest(new { message = "Failed to insert family member." });
        }
        [HttpGet("FamilyMember")]
        public async Task<IActionResult> GetAll()
          => Ok(await _mediator.Send(new GetAllFamilyMemberTypeQuery()));
    }
}

