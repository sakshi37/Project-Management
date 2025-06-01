using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.SearchEmployee
{
    public class SearchEmployeesQueryHandler : IRequestHandler<SearchEmployeesQuery, List<SearchEmployeeVm>>
    {
        private readonly IEmployeeMasterRepository _repo;

        public SearchEmployeesQueryHandler(IEmployeeMasterRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<SearchEmployeeVm>> Handle(SearchEmployeesQuery request, CancellationToken cancellationToken)
        {
            return await _repo.SearchEmployeesAsync(request.Dto);
        }
    }
}
