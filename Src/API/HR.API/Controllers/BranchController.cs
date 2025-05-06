using HR.Application.Features.Branches.Commands.CreateBranch;
using HR.Application.Features.Branches.Commands.DeleteBranch;
using HR.Application.Features.Branches.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    
        [Route("api/[controller]")]
        [ApiController]
        public class BranchController : Controller
        {
            private readonly IMediator _mediator;

            public BranchController(IMediator mediator)
            {
                _mediator = mediator;
            }

            [HttpPost]
            public async Task<IActionResult> Create([FromBody] CreateBranchDto dto)
                => Ok(await _mediator.Send(new CreateBranchCommand(dto)));
            [HttpGet]
            public async Task<IActionResult> GetAll()
               => Ok(await _mediator.Send(new GetAllBranchesQuery()));
            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
            {
                int updatedBy = 1;

                return Ok(await _mediator.Send(new DeleteBranchCommand(id, updatedBy)));
            }

        }
    }

