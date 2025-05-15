using HR.Application.Features.Employee.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetEmployeeByDesignation
{
    public record GetEmployeeByDesignationQuery(int did): IRequest<IEnumerable<EmployeeDto>>;
    
    
}
