using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts;
using HR.Application.Exceptions;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

public class DailyReportRepository : IDailyReport
{
    private readonly AppDbContext _context;

    public DailyReportRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DailyReportResponse>> GetAllDailyreport(DailyReportrequest request)
    {
        var reports = await _context.DailyReport
                 .FromSqlRaw("SP_GetAllDailyReports", request.Date)
                 .ToListAsync();

        if (reports == null || !reports.Any())
        {
            throw new NotFoundException($"No reports found for {request.Date:yyyy-MM-dd}");
        }

        // Optional: You can filter by code or name if provided
        if (!string.IsNullOrEmpty(request.Code))
        {
            reports = reports.Where(r => r.Code == request.Code).ToList();
        }

        if (!string.IsNullOrEmpty(request.Name))
        {
            reports = reports.Where(r => r.Name == request.Name).ToList();
        }

        return reports.Select(report => new DailyReportResponse
        {
            InTime = report.InTime,
            OutTime = report.OutTime,
            Name = report.Name,
            Code = report.Code,
            Id = report.Id,
            Department = report.Department,
            Date = report.Date
        }).ToList();
    }
}
