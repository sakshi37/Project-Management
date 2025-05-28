using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetHalfDayDetails
{
    public class HalfDayQueryVm
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string DepartmentName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal TotalHours { get; set; }
    }
}
