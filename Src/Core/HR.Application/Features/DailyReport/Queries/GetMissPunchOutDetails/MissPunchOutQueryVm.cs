using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails
{
    public class MissPunchOutQueryVm
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string DepartmentName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
