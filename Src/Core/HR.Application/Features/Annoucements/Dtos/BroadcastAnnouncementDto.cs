using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Annoucements.Dtos
{
    public class BroadcastAnnouncementDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string TargetType { get; set; } // All, UserGroup, Employee
        public string TargetValue { get; set; } // e.g., "1,3" for group/employee
    }

}
