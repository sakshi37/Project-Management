using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails
{
    public class MissPunchInQueryVm
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string DepartmentName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
