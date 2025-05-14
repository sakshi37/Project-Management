using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Application.Features.TeamCompositions.Queries.GetAllTeamCompositions;
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

        //[HttpGet("GetAllTeamCompositions")]
        //public async Task<IActionResult> GetAllTeamCompositions()
        //{
        //    var result = await _mediator.Send(new GetAllTeamCompositionQuery());
        //    return Ok(result);
        //}
        //[Route("{branchId?}/{divisionId?}")]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? branchId, [FromQuery] int? divisionId)
        {
            var result = await _mediator.Send(new GetAllTeamCompositionQuery(branchId, divisionId));
            return Ok(result);
        }
    }

}
