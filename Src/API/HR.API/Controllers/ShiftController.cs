using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftController : Controller
    {
        private readonly IMediator _mediator;

        public ShiftController(IMediator mediator) {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
           => Ok(await _mediator.Send(new GetAllShiftsQuery()));
    }
}
