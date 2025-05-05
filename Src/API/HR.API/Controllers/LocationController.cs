using HR.Application.Features.Location.Query;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        readonly IMediator _mediator;

        public LocationController(IMediator mediator)
        {

            _mediator = mediator;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllLocation()
        {

            var dto = await _mediator.Send(new GetAllLocationListQuery());
            return Ok(dto);
        }




    }
}
