using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Commands.ReadAndDeleteNotification
{
    public class ReadAndDeleteNotificationCommand:IRequest<int>
    {
         public int NotificationId { get; set; }
        public ReadAndDeleteNotificationCommand(int notificationId)
        {
            NotificationId = notificationId;
        }
            
    }
}
