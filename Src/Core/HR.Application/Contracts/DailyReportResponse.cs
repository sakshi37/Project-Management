using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts
{
    public class DailyReportResponse
    {
        public DateTime Date { get; set; }
        public string Department { get; set; }
        public DateTime? InTime { get; set; }
        public DateTime? OutTime { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Id { get; set; }

    }
}
