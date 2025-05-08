using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.DeleteState;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Application.Features.States.Queries.GetAllStates;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StateController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StateController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStateDto dto)
            => Ok(await _mediator.Send(new CreateStateCommand(dto)));

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateStateDto dto)
            => Ok(await _mediator.Send(new UpdateStateCommand(dto)));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int updatedBy = 1; 

            return Ok(await _mediator.Send(new DeleteStateCommand(id, updatedBy)));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _mediator.Send(new GetAllStatesQuery()));
    }

}
