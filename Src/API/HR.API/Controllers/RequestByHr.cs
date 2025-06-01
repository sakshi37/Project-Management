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
                return BadRequest(new { Error = "Invalid request." });

            try
            {
                var command = new CreateRequestCommand(dto);
                var result = await _mediator.Send(command);

                if (result == 1)
                    return Ok(new { Message = "Request created successfully." });

                return StatusCode(500, new { Error = "Failed to create request." });
            }
            catch (InvalidOperationException ex)
            {
                // This is for known validation errors, e.g. foreign key constraint violation or business rules
                return BadRequest(new { Error = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                // For missing data like employee not found
                return NotFound(new { Error = ex.Message });
            }
            catch (ApplicationException ex)
            {
                // General application exceptions
                return BadRequest(new { Error = ex.Message });
            }
            catch (Exception ex)
            {
                // Unexpected errors — don't leak sensitive details in production, but useful for dev logs
                return StatusCode(500, new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }

    }
}
