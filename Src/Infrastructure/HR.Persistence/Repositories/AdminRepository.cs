using System.Net.WebSockets;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Admin.Queries.GetAllEmployee;
using HR.Application.Features.Admin.Queries.GetEmployeeById;
using HR.Application.Features.Admin.Queries.GetPendingRequest;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AppDbContext _appDbContext;
        public
            AdminRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<List<PendingRequestVm>> GetPendingRequestAsync()
        {
            return await _appDbContext.pendingRequestVms.FromSqlRaw("EXEC SP_GetAllPendingRequest").ToListAsync();
        }
        public async Task<string> RejectRequestAsync(int requestId, string empCode, string comment)
        {
            var result = await _appDbContext
                .Database
                .ExecuteSqlRawAsync("EXEC dbo.SP_RejectRequest @RequestId = {0}, @EmpCode = {1}, @Comment={2}", requestId, empCode, comment);
            Console.WriteLine($"Affected rows: {result}");

            return result < 0 ? "Request is rejected successfully...." : "Failed to reject request";

        }
        public async Task<string> ApproveRequestAsync(int requestId, string empCode, string comment)
        {
            var result = await _appDbContext
               .Database
               .ExecuteSqlRawAsync("EXEC dbo.SP_ApproveRequest @RequestId = {0}, @EmpCode = {1}, @Comment={2}", requestId, empCode, comment);
            Console.WriteLine($"Affected rows: {result}");

            return result < 0 ? "Request is Approved successfully" : "Failed to Approve request";
        }
        public async Task<List<GetEmployeeDto>> GetEmployee()
        {
            return await _appDbContext.getEmployeeDtos.FromSqlRaw("SP_GetEmpo").ToListAsync();
        }

        public async  Task<string> UpdateUserRole(string code, int UserGroupId)
        {
            var result=await _appDbContext
                .Database
                .ExecuteSqlRawAsync("EXEC dbo.SP_updateEmployeeRoles @Code = {0}, @Fk_UserGroupId = {1}", code, UserGroupId);
            return result > 0 ? "Role is Updated successfully" : "Failed to update role";
        }

        public async  Task<List<GetEmployeeByIdDto>> GetEmployeeById(int id)
        {
            return await _appDbContext.GetEmployeeByIdDto
                .FromSqlRaw("Exec [dbo].[GetEmployeeBYId] @Id ={0}", id).ToListAsync();
             

        }

        
    }
}
