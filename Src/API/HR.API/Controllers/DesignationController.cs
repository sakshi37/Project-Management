using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.DeleteCountry;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Countries.Queries.GetAllCountries;
using HR.Application.Features.Countries.Queries.GetCountryById;
using HR.Application.Features.Designations.Commands.CreateDesignation;
using HR.Application.Features.Designations.Commands.DeleteDesignation;
using HR.Application.Features.Designations.Commands.UpdateDesignation;
using HR.Application.Features.Designations.Queries.GetAllDesignations;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesignationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DesignationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDesignationDto dto)
            => Ok(await _mediator.Send(new CreateDesignationCommand(dto)));

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateDesignationDto dto)
            => Ok(await _mediator.Send(new UpdateDesignationCommand(dto)));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int updatedBy = 1;
            return Ok(await _mediator.Send(new DeleteDesignationCommand(id, updatedBy)));
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _mediator.Send(new GetAllDesignationsQuery()));

        

    }

}
