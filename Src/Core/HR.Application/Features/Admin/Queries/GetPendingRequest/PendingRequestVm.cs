using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Queries.GetPendingRequest
{
    public class PendingRequestVm
    {  
        public int RequestId { get; set; }
        public DateTime RequestDate {get;set;}
        public string EmployeeName { get; set; }
        public string RequestByName { get; set; }
        public string Reason { get; set; }
        public string? Action { get; set; }
    }
}
