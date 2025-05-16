using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IDailyReport
    {
        Task<List<DailyReportResponse>>GetAllDailyreport(DailyReportrequest request);
    }
}
