using HR.Application.Contracts.Models.Common;
using HR.Application.Features.Employee.Queries.GetAllEmployees;
using HR.Application.Features.Employee.Queries.GetEmployeeProfile;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Persistence
{
    public interface IEmployeeMasterRepository
    {
        public Task<Employee> AddEmployee(CreateEmployeeMasterDto employee);
        Task<string> MakeEmployeeInactiveAsync(string code);
        Task<string> MakeEmployeeActiveAsync(string code); 
        Task<PaginatedResult<GetAllEmployeeVm>> GetAllEmployeeSummaryPagedAsync(int pageNumber, int pageSize);
        //Task<GetEmployeeProfileQueryVm> GetEmployeeProfileAsync(int id);
        Task<GetEmployeeProfileQueryVm> GetEmployeeProfileAsync(string Code);

        //public Task<List<Employee>> GetAllEmployee();
    }
}
