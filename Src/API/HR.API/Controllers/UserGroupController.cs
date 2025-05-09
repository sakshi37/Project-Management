using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using HR.Application.Features.UserGroup.Queries.GetAllUserGroup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGroupController : Controller
    {
        
            private readonly IMediator _mediator;

            public UserGroupController(IMediator mediator)
            {
                _mediator = mediator;
            }

            [HttpGet]
            public async Task<IActionResult> GetAll()
               => Ok(await _mediator.Send(new GetAllUserGroupQuery()));
        }
    }

