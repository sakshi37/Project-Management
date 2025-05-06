using HR.Application.Features.Branches.Commands.Dtos;
using HR.Application.Features.Cities.Commands.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Commands.CreateBranch
{
    public record CreateBranchCommand(CreateBranchDto Branch) : IRequest<BranchDto>;

}
