using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.Employees.Queries.GetEmployeesAll
{
    public class GetEmployeesAllQuery : IRequest<List<GetEmployeeDto>> { }

}
