using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails;
using HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails;
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
    public class AttendanceRepository:IAttendanceRepository
    {
        readonly AppDbContext _appDbContext;
        public AttendanceRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;

        }

        public async Task<List<MissPunchInQueryVm>> GetMissPunchInReportAsync(DateTime startDate)
        {
            var startDateParam = new SqlParameter("@StartDate", startDate);

            var result = await _appDbContext.MissPunchInQueryVms
                .FromSqlRaw("EXEC SP_GetReportOfMissPunchIn @StartDate", startDateParam)
                .ToListAsync();

            return result;
        }

        public async  Task<List<MissPunchOutQueryVm>> GetMissPunchOutReportAsync(DateTime startDate)
        {
            var startDateParam = new SqlParameter("@StartDate", startDate);

            var result = await _appDbContext.MissPunchOutQueryVms
                .FromSqlRaw("EXEC SP_GetReportOfMissPunchOut @StartDate", startDateParam)
                .ToListAsync();

            return result;
        }
    }
}
