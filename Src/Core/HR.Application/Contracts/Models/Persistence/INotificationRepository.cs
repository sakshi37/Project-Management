using HR.Application.Features.Notification.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface INotificationRepository
    {
        Task<List<GetNotificationByCodeVm>> GetNotificationDetailsAsync(string code);
        Task<int> ReadAndDeleteNotificationAsync(int notificationId);
    }
}
