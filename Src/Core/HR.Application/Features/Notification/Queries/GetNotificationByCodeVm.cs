using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Queries
{
    public class GetNotificationByCodeVm
    {
      
        public int Fk_EmpId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
