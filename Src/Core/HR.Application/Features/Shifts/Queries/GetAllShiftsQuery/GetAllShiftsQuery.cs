using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Shifts.Queries.GetAllShiftsQuery
{
    public record GetAllShiftsQuery:IRequest<List<GetAllShiftsVm>>;
    
}
