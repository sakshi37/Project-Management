//using HR.Application.Features.Cities.Commands.DeleteCity;
//using HR.Application.Features.Cities.Queries.GetAllCities;
//using HR.Application.Features.Divisions.Command.CreateLocationCommand;
//using HR.Application.Features.Divisions.Command.DeleteDivision;
//using HR.Application.Features.Divisions.Command.UpdateDivision;
//using HR.Application.Features.Divisions.Query.GetAllQuery;
//using HR.Application.Features.Locations.Commands.UpdateLocation;
//using MediatR;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace HR.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DivisionController : ControllerBase
//    {
//        private readonly IMediator _mediator;
//        public DivisionController(IMediator mediator)
//        {
//            _mediator = mediator;
            
//        }
//        [HttpPost]
//        public async Task<IActionResult> create([FromBody] CreateDivisionDto dto)
//            => Ok(await _mediator.Send(new CreateDivisionCommand(dto)));

//        [HttpPut]
//        public async Task<IActionResult> Update([FromBody] UpdateDivisionDto dto)
//        => Ok(await _mediator.Send(new UpdateDivisionCommand(dto)));

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            int updatedBy = 1;

//            return Ok(await _mediator.Send(new DeleteDivisionCommand(id, updatedBy)));
//        }
//        [HttpGet]
//        public async Task<IActionResult> GetAll()
//           => Ok(await _mediator.Send(new GetAllDivisionQuery()));
//    }
//}
