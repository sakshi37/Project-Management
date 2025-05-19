using HR.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Deparment.Querries.GetAllDepartment
{
    public record  GetAllDepartmentQuery:IRequest<List<Department>>;
    
    
}
