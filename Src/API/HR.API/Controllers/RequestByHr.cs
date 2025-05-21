using HR.Application.Features.RequestByHr.Commands.CreateRequest;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestByHr : ControllerBase
    {
        private readonly IMediator _mediator;

        public RequestByHr(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateRequestDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request.");

            try
            {
                var command = new CreateRequestCommand(dto);
                var result = await _mediator.Send(command);

                if (result == 1)
                    return Ok(new { Message = "Request created successfully." });

                return StatusCode(500, "Failed to create request.");
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }
    }
}
