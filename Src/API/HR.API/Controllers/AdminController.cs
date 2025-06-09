using AutoMapper;
using HR.Application.Features.Admin.Commands.ApproveRequest;
using HR.Application.Features.Admin.Commands.RejectRequest;
using HR.Application.Features.Admin.Commands.UpdateUserRole;
using HR.Application.Features.Admin.Queries.GetAllEmployee;
using HR.Application.Features.Admin.Queries.GetEmployeeById;
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
        public AdminController(IMediator mediator, IMapper mapper)
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

        [HttpGet("GetEmployee")]
        public async Task<IActionResult> GetEmployee()
        {
            var response = await _mediator.Send(new GetEmployeeQuery());
            return Ok(response);
        }

        [HttpPut("UpdateUserRole")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRoleCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new { Success = result });

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id) 
        {
            var resut = await _mediator.Send(new GetEmployeeByIdQuery(id));
            return Ok(resut);
        }
    }
}   
