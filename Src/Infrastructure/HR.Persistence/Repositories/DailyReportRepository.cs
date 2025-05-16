using HR.Application.Contracts;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exceptions;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class DailyReportRepository : IDailyReport
    {
        private readonly AppDbContext _context;

        public DailyReportRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DailyReportResponse> GetAllDailyreport(DailyReportrequest request)
        {
            
            var reports = await _context.DailyReport
                .FromSqlRaw("EXEC sp_GetMissPunchInReport @p0", request.Date)
                .ToListAsync();
 
            if (reports == null || !reports.Any())
            {
                throw new NotFoundException($"No report found for Code {request.Code} on {request.Date:yyyy-MM-dd}");
            }

            // Find the specific employee report by Code
            var report = reports.FirstOrDefault(r => r.Code == request.Code);

            if (report == null)
            {
                throw new NotFoundException($"No report found for Code {request.Code}");
            }

            if (report.InTime == null)
            {
                throw new NotFoundException("You missed the punch in today.");
            }

            if (report.OutTime == null)
            {
                throw new NotFoundException("You forgot to punch out.");
            }

            if (report.Name != request.Name)
            {
                throw new NotFoundException($"User name mismatch for Code {request.Code}");
            }

            var response = new DailyReportResponse
            {
                InTime = report.InTime,
                OutTime = report.OutTime,
                Name = report.Name,
                Code = report.Code,
                Id = report.Id,
                Department = report.Department,
                Date = report.Date
            };

            return response;
        }
    }
}
