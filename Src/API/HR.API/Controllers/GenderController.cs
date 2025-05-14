using HR.Application.Features.Gender.Queries.GetAllGender;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenderController : Controller
    {
        private readonly IMediator _mediator;

        public GenderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
           => Ok(await _mediator.Send(new GetAllGenderQuery()));
    }
}

