using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.DailyReport.Queries
{
    public record GetAllDailyReportQuery:IRequest<List<DailyReportResponse>>;
   
}
