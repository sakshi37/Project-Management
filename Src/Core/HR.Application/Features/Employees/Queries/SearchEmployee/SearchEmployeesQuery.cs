using HR.Application.Features.Employees.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.SearchEmployee
{
    public record SearchEmployeesQuery(SearchEmployeesDto Dto) : IRequest<List<SearchEmployeeVm>>;


}
