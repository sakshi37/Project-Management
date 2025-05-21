using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails
{
    public class MissPunchOutQuery: IRequest<List<MissPunchOutQueryVm>>
    {
        public DateTime StartDate { get; set; }
    }
    
}
