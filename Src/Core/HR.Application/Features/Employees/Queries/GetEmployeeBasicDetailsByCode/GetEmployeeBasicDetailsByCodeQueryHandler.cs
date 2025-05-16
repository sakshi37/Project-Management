using AutoMapper;
using HR.Application.Contracts.Persistence;
using HR.Application.Features.Employees.Commands.MakeEmployeeInactivate;
using HR.Application.Features.Employees.Queries.GetEmployeeBasicDetails;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetEmployeeBasicDetailsByCode
{
    public class GetEmployeeBasicDetailsByCodeQueryHandler : IRequestHandler<GetEmployeeBasicDetailsByCodeQuery, GetEmployeeBasicDetailsByCodeQueryVm?>
    {
        private readonly IEmployeeMasterRepository _repo;
        private readonly IMapper _mapper;

        public GetEmployeeBasicDetailsByCodeQueryHandler(IEmployeeMasterRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<GetEmployeeBasicDetailsByCodeQueryVm?> Handle(GetEmployeeBasicDetailsByCodeQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetDetailsAsync(request.Code);
        }
    }

}
