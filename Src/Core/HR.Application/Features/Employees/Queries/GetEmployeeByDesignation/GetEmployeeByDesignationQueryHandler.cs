using HR.Application.Contracts.Persistence;
using HR.Application.Features.Employee.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetEmployeeByDesignation
{
    public class GetEmployeeByDesignationQueryHandler : IRequestHandler<GetEmployeeByDesignationQuery, IEnumerable<EmployeeDto>>
    {
        private readonly IEmployeeMasterRepository _employeeMasterRepository;
        public GetEmployeeByDesignationQueryHandler(IEmployeeMasterRepository employeeMasterRepository)
        {
            _employeeMasterRepository = employeeMasterRepository;
        }
        public async Task<IEnumerable<EmployeeDto>> Handle(GetEmployeeByDesignationQuery request, CancellationToken cancellationToken)
        {
            return await _employeeMasterRepository.GetEmployeeByDesignationId(request.did);
        }
    }
}
