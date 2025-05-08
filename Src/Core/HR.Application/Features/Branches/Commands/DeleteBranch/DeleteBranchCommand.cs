using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Commands.DeleteBranch
{
    public record DeleteBranchCommand(int BranchId, int UpdatedBy) : IRequest<bool>;

}
