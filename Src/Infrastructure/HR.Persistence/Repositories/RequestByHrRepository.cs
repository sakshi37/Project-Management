using HR.Application.Contracts.Models.Persistence;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class RequestByHrRepository:IRequestByHrRepository
    { 
        private readonly AppDbContext _appDbContext;

        public RequestByHrRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<int> CreateRequestAsync(string forEmpCode, string requestByEmpCode, string reason)
        {
            var sql = "EXEC [dbo].[SP_CreateRequest] @ForEmpCode = {0}, @RequestByEmpCode = {1}, @Reason = {2}";

            try
            {
                await _appDbContext.Database.ExecuteSqlRawAsync(sql, forEmpCode, requestByEmpCode, reason);
                return 1; // Return 1 or any success indicator (you can enhance this as needed)
            }
            catch (Exception ex)
            {
                // Log exception or rethrow as needed
                throw new ApplicationException("Failed to execute stored procedure", ex);
            }
        }
    }
}
