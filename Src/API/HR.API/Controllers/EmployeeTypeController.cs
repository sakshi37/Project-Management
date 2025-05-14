using HR.Application.Features.EmployeeType.Queries.GetAllEmployeeType;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeTypeController : Controller
    {
        private readonly IMediator _mediator;

        public EmployeeTypeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
           => Ok(await _mediator.Send(new GetAllEmployeeTypeQuery()));
    }
}
