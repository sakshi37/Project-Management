using HR.Application.Features.ProjectMaster.Query;
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
        [HttpGet]
        public async Task<IActionResult> GetAllResult()
        {
            var Response = await _mediator.Send(new GetAllProjectQuery());
            return Ok(Response);
        }
    }
}
