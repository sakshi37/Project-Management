using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.UserGroup.Queries.GetAllUserGroup
{
    public record GetAllUserGroupQuery: IRequest<List<GetAllUserGroupQueryVm>>;
    
}
