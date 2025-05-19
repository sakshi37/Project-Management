using HR.Application.Features.Deparment.Querries.GetAllDepartment;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IMediator _mediator;
        
        public DepartmentController(IMediator mediator)
        {
         _mediator = mediator;   
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var department = await _mediator.Send(new GetAllDepartmentQuery());
            return Ok(department);

        }
    }
}
