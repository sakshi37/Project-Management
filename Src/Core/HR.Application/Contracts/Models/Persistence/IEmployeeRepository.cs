using HR.Domain.Entities;

namespace HR.Application.Contracts.Persistence
{
    public interface IEmployeeMasterRepository
    {
        public Task<Employee> AddEmployee(CreateEmployeeMasterDto employee);
        //public Task<List<Employee>> GetAllEmployee();
    }
}
