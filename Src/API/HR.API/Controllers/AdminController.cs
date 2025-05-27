using AutoMapper;
using HR.Application.Features.Admin.Commands.ApproveRequest;
using HR.Application.Features.Admin.Commands.RejectRequest;
using HR.Application.Features.Admin.Queries.GetPendingRequest;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public AdminController(IMediator mediator,IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetRequest()
           => Ok(await _mediator.Send(new PendingRequestQuery()));

        [HttpPost("rejectrequest")]
        public async Task<IActionResult> RejectRequest([FromBody] RejectRequestDto dto)
        {
            // Map DTO to Command
            var command = _mapper.Map<RejectRequestCommand>(dto);

            // Send command through MediatR
            var result = await _mediator.Send(command);

            return Ok(new { Message = result });
        }

        [HttpPost("approverequest")]
        public async Task<IActionResult> ApproveRequest([FromBody] ApproveRequestDto dto)
        {
            // Map DTO to Command
            var command = _mapper.Map<ApproveRequestCommand>(dto);

            // Send command through MediatR
            var result = await _mediator.Send(command);

            return Ok(new { Message = result });
        }

    }
}
