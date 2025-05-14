using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeType.Queries.GetAllEmployeeType
{
    public record GetAllEmployeeTypeQuery:IRequest<List<GetAllEmployeeTypeQueryVm>>;
    
}
