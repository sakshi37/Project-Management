using HR.Application.Contracts.Models.Common;
using HR.Application.Features.Employee.Dtos;
using HR.Application.Features.Employee.Queries.GetEmployeeProfile;
using HR.Application.Features.Employees.Commands.InsertEmployeeDetailsGmc;
using HR.Application.Features.Employees.Commands.UpdateEmployee;
using HR.Application.Features.Employees.Queries.GetAllEmployees;
using HR.Application.Features.Employees.Queries.GetAllEmployeesByIdName;
using HR.Application.Features.Employees.Queries.GetEmployeeBasicDetails;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Persistence
{
    public interface IEmployeeMasterRepository
    {
        public Task<Employee> AddEmployee(CreateEmployeeMasterDto employee);
        //public Task<List<Employee>> GetAllEmployee();
        Task<string> MakeEmployeeInactiveAsync(string code);
        Task<string> MakeEmployeeActiveAsync(string code);
        Task<PaginatedResult<GetAllEmployeeVm>> GetAllEmployeeSummaryPagedAsync(int pageNumber, int pageSize);
        //Task<GetEmployeeProfileQueryVm> GetEmployeeProfileAsync(int id);
        Task<GetEmployeeProfileQueryVm> GetEmployeeProfileAsync(string Code);
        Task<IEnumerable<EmployeeDto>> GetEmployeeByDesignationId(int did);
        Task<EmployeeDto> GetEmaployeeByEmail(string email);
        Task<bool> UpdateEmployeeAsync(UpdateEmployeeCommandDto dto);

        Task<GetEmployeeBasicDetailsByCodeQueryVm?> GetDetailsAsync(string code);
        // IEmployeeMasterRepository.cs
        Task<bool> InsertEmployeeDetailsGmcAsync(InsertEmployeeDetailsGmcCommandDto employee);
        Task<bool> EmployeeExistsAsync(string code);


        Task<int> ReadCurrentEmpCounter();

        Task<List<GetAllEmployeeByIdNameDto>> GetAllEmployeeByIdName();

        Task IncrCurrentEmpCounter();

    }
}
