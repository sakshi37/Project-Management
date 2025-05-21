using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Common;
using HR.Application.Contracts.Persistence;
using HR.Application.Features.Employee.Commands.Query;
using HR.Application.Features.Employees.Queries.GetAllEmployees;
using MediatR;

namespace HR.Application.Features.Employees.Queries.GetEmployeesAll
{
    public class GetEmployeesAllQueryHandler : IRequestHandler<GetEmployeesAllQuery, List<GetEmployeeDto>>
    {
        private readonly IEmployeeMasterRepository _employeeRepository;
        private readonly IMapper _mapper;

        public GetEmployeesAllQueryHandler(IEmployeeMasterRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<List<GetEmployeeDto>> Handle(GetEmployeesAllQuery request, CancellationToken cancellationToken)
        {
            var employees = await _employeeRepository.GetAllEmployeesAsync();
            return _mapper.Map<List<GetEmployeeDto>>(employees);
        }
    }

}
