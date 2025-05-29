using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Commands.ReadNotification
{
    public class ReadNotificationCommand : IRequest<int>
    {
        public int NotificationId { get; set; }
        public ReadNotificationCommand(int notificationId)
        {
            NotificationId = notificationId;
        }

    }
}
