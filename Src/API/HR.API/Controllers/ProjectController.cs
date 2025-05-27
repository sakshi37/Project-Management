using HR.Application.Features.ProjectMaster.Command;
using HR.Application.Features.ProjectMaster.Query;
using HR.Application.Features.ProjectMaster.Stack.Queries.GetAllStack;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProjectController(IMediator mediator)
        {

            _mediator = mediator;
        }
        [HttpGet("GetAllProject")]
        public async Task<IActionResult> GetAllResult()
        {
            var Response = await _mediator.Send(new GetAllProjectQuery());
            return Ok(Response);
        }

        [HttpPost]
        public async Task<IActionResult> InsertProject([FromBody] CreateProjectDto project)
        {
            var response = await _mediator.Send(new CreateProjectCommand(project));
            return Ok(response);
        }

        [HttpGet("GetAllStack")]
        public async Task<IActionResult> GetAllStack()
        {
            var response = await _mediator.Send(new GetAllStackQuery());
            return Ok(response);
        }
    }
}
