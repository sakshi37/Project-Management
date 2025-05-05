using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.DeleteCountry;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Countries.Queries.GetAllCountries;
using HR.Application.Features.Countries.Queries.GetCountryById;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase
{
    private readonly IMediator _mediator;

    public CountryController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCountryDto dto)
        => Ok(await _mediator.Send(new CreateCountryCommand(dto)));

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateCountryDto dto)
        => Ok(await _mediator.Send(new UpdateCountryCommand(dto)));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        int updatedBy = 1; 
        return Ok(await _mediator.Send(new DeleteCountryCommand(id, updatedBy)));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _mediator.Send(new GetAllCountriesQuery()));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => Ok(await _mediator.Send(new GetCountryByIdQuery(id)));
}

}
