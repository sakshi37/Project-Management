using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Application.Features.TeamCompositions.Commands.UpdateTeamComposition;
using HR.Application.Features.TeamCompositions.Queries.GetAllTeamCompositions;
using HR.Application.Features.TeamCompositions.Queries.GetAllTeamLeaders;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamCompositionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TeamCompositionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateTeamCompositionDto dto)
        {
            var result = await _mediator.Send(new CreateTeamCompositionCommand(dto));
            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateTeamCompositionDto team)
        {
            var result = await _mediator.Send(new UpdateTeamCompositionCommand(team));
            return Ok(result);
        }


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? branchId, [FromQuery] int? divisionId)
        {
            var result = await _mediator.Send(new GetAllTeamCompositionQuery(branchId, divisionId));
            return Ok(result);
        }

        [HttpGet("team-leaders")]
        public async Task<IActionResult> GetTeamLeaders()
        {
            var result = await _mediator.Send(new GetAllTeamLeaderQuery());
            return Ok(result);
        }
    }

}
