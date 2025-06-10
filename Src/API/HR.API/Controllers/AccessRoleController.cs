using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Features.AccesRole.Command.CreateAccessRole;
using HR.Application.Features.AccesRole.Querry.GetAllAcessRole;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessRoleController : Controller
    {
        readonly IMediator _mediator;
        readonly IMapper _mapper;
        public AccessRoleController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAccessRole()
        {
            var response = await _mediator.Send(new GetAllAccessRoleQuery());
            return Ok(response);
        }
        [HttpPost("CreateAccessRole")]
        public async Task<IActionResult> result([FromBody] CreateAcessRoleCommand command)
        {
            if (command == null)
            {
                return BadRequest("Invalid data.");
            }
            var result =await _mediator.Send(command);   
            return Ok(result);
        }
    }
}
