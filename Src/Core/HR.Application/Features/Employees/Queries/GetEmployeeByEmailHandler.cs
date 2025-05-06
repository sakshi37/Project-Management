//using HR.Application.Contracts.Persistence;
//using HR.Application.Features.Employee.Commands.Query;
//using MediatR;

//namespace HR.Application.Features.Employees.Queries
//{
//    public class GetEmployeeByEmailHandler : IRequestHandler<GetEmployeeByEmailQuery, GetEmployeeVm>
//    {
//        readonly IEmployeeMasterRepository _employeeRepo;
//        public GetEmployeeByEmailHandler(IEmployeeMasterRepository employee)
//        {

//            _employeeRepo = employee;

//        }

//        public async Task<GetEmployeeVm> Handle(GetEmployeeByEmailQuery request, CancellationToken cancellationToken)
//        {

//        }
//    }
//}
