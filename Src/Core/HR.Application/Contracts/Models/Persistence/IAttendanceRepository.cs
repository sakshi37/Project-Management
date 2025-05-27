using HR.Application.Features.DailyReport.Queries.GetHalfDayDetails;
using HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails;
using HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails;


namespace HR.Application.Contracts.Models.Persistence
{
    public interface IAttendanceRepository
    {
        Task<List<MissPunchOutQueryVm>> GetMissPunchOutReportAsync(DateTime startDate);
        Task<List<MissPunchInQueryVm>> GetMissPunchInReportAsync(DateTime startDate);
        Task<List<HalfDayQueryVm>> GetHalfDayReportAsync(DateTime startDate);

    }
}
