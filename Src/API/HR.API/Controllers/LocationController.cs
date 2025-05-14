using HR.Application.Features.Locations.Commands.CreateLocation;
using HR.Application.Features.Locations.Commands.DeleteLocation;
using HR.Application.Features.Locations.Commands.UpdateLoation;
using HR.Application.Features.Locations.Queries.GetAllLocation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly IMediator _mediator;
       

        public LocationController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateLocationDto dto)
        => Ok(await _mediator.Send(new CreateLocationCommand(dto)));

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateLocationDto dto)
        => Ok(await _mediator.Send(new UpdateLocationCommand(dto)));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int updatedBy = 1;
            return Ok(await _mediator.Send(new DeleteLocationCommand(id, updatedBy)));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
            => Ok(await _mediator.Send(new GetAllLocationQuery()));


        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetById(int id)
        //    => Ok( await _mediator.Send(new GetLocationByIdQuery(id)));
       
    }
}
