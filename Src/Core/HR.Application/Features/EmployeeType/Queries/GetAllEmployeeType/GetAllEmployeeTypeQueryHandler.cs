using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeType.Queries.GetAllEmployeeType
{
    public class GetAllEmployeeTypeQueryHandler : IRequestHandler<GetAllEmployeeTypeQuery, List<GetAllEmployeeTypeQueryVm>>
    {
        private readonly IEmployeeTypeRepository _repo;
        public GetAllEmployeeTypeQueryHandler(IEmployeeTypeRepository repo  )
        {
            _repo = repo;
        }
        public async Task<List<GetAllEmployeeTypeQueryVm>> Handle(GetAllEmployeeTypeQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }

    }
}
