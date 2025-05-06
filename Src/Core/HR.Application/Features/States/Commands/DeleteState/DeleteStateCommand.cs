using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.States.Commands.DeleteState
{
    public record DeleteStateCommand(int StateId, int UpdatedBy) : IRequest<bool>;

}
