using HR.Application.Features.Admin.Queries.GetAllEmployee;
using HR.Application.Features.Admin.Queries.GetEmployeeById;
using HR.Application.Features.Admin.Queries.GetPendingRequest;
using HR.Application.Features.Employee.Dtos;


namespace HR.Application.Contracts.Models.Persistence
{
    public interface IAdminRepository
    {
        Task<List<PendingRequestVm>> GetPendingRequestAsync();
        Task<string> RejectRequestAsync(int requestId, string empCode, string comment);
        Task<string> ApproveRequestAsync(int requestId, string empCode, string comment);

        Task<List<GetEmployeeDto>> GetEmployee();

        Task<string> UpdateUserRole(string code, int UserGroupId);

        Task<List<GetEmployeeByIdDto>> GetEmployeeById(int id);


    }
}
