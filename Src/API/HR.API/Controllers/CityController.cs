using HR.Application.Features.Cities.Commands.CreateCity;
using HR.Application.Features.Cities.Commands.DeleteCity;
using HR.Application.Features.Cities.Commands.UpdateCity;
using HR.Application.Features.Cities.Queries.GetAllCities;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.DeleteState;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Application.Features.States.Queries.GetAllStates;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCityDto dto)
            => Ok(await _mediator.Send(new CreateCityCommand(dto)));

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateCityDto dto)
            => Ok(await _mediator.Send(new UpdateCityCommand(dto)));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int updatedBy = 1;

            return Ok(await _mediator.Send(new DeleteCityCommand(id, updatedBy)));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _mediator.Send(new GetAllCitiesQuery()));
    }
}
