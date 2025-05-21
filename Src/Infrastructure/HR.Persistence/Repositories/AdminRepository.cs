using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Admin.Queries.GetPendingRequest;
using HR.Persistence.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public async Task<string> RejectRequestAsync(int requestId, string empCode)
        {
            var result = await _appDbContext
                .Database
                .ExecuteSqlRawAsync("EXEC dbo.SP_RejectRequest @RequestId = {0}, @EmpCode = {1}", requestId, empCode);
            Console.WriteLine($"Affected rows: {result}");

            return result < 0 ? "Request is rejected successfully" : "Failed to reject request";

        }

    }
}
