using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts;
using HR.Application.Contracts.Models.Persistence;
using MediatR;
using MediatR.Pipeline;

namespace HR.Application.Features.DailyReport.Queries
{
    public class GetAllDailyReportHandler : IRequestHandler<GetAllDailyReportQuery, List<DailyReportResponse>>
    {

        readonly IDailyReport _dailyReport;
        public GetAllDailyReportHandler(IDailyReport dailyReport)
        {
            _dailyReport=dailyReport;
        }
        public async Task<List<DailyReportResponse>> Handle(GetAllDailyReportQuery request, CancellationToken cancellationToken)
        {
            return await _dailyReport.GetAllDailyreport();
        }
    }
}
