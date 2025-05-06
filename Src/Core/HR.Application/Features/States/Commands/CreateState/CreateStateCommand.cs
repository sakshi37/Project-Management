using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.States.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.States.Commands.CreateState
{
    public record CreateStateCommand(CreateStateDto State) : IRequest<StateDto>;

}
