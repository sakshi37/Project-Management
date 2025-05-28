using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetHalfDayDetails
{
    public class HalfDayQuery : IRequest<List<HalfDayQueryVm>>
    {
        public DateTime StartDate { get; set; }
    }
}
