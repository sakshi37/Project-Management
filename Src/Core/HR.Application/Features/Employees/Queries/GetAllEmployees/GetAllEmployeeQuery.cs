using HR.Application.Contracts.Models.Common;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetAllEmployees
{

 public class GetAllEmployeeQuery : IRequest<PaginatedResult<GetAllEmployeeVm>>
    {
        public int Id { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
