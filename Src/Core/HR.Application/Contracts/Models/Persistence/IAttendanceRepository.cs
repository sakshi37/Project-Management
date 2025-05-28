using HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails;
using HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IAttendanceRepository
    {
        Task<List<MissPunchOutQueryVm>> GetMissPunchOutReportAsync(DateTime startDate);
        Task<List<MissPunchInQueryVm>> GetMissPunchInReportAsync(DateTime startDate);

    }
}
