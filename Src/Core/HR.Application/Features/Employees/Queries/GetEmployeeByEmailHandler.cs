using HR.Application.Contracts.Persistence;
using HR.Application.Features.Employee.Dtos;
using MediatR;

namespace HR.Application.Features.Employees.Queries
{
    public class GetEmployeeByEmailHandler : IRequestHandler<GetEmployeeByEmailQuery, EmployeeDto>
    {
        readonly IEmployeeMasterRepository _employeeRepo;
        public GetEmployeeByEmailHandler(IEmployeeMasterRepository employee)
        {

            _employeeRepo = employee;

        }

        public async Task<EmployeeDto> Handle(GetEmployeeByEmailQuery request, CancellationToken cancellationToken)
        {
            var employee = await _employeeRepo.GetEmaployeeByEmail(request.email);
            return employee;
        }


    }
}
