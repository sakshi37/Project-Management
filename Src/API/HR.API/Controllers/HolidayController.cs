using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.DeleteCountry;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Countries.Queries.GetAllCountries;
using HR.Application.Features.Countries.Queries.GetCountryById;
using HR.Application.Features.Holidays.Commands.CreateHoliday;
using HR.Application.Features.Holidays.Commands.DeleteHoliday;
using HR.Application.Features.Holidays.Commands.UpdateHoliday;
using HR.Application.Features.Holidays.Queries.GetAllHolidays;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HolidayController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HolidayController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHolidayDto dto)
            => Ok(await _mediator.Send(new CreateHolidayCommand(dto)));

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateHolidayDto dto)
            => Ok(await _mediator.Send(new UpdateHolidayCommand(dto)));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int updatedBy = 1;
            return Ok(await _mediator.Send(new DeleteHolidayCommand(id, updatedBy)));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _mediator.Send(new GetAllHolidaysQuery()));

    }

}
