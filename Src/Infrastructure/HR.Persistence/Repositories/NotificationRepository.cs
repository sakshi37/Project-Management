using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Notification.Queries;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly AppDbContext _appDbContext;

        public NotificationRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<GetNotificationByCodeVm>> GetNotificationDetailsAsync(string code)
        {
            var notification = _appDbContext
        .Set<GetNotificationByCodeVm>()
        .FromSqlRaw("EXEC SP_GetNotificationsByEmpCode @EmpCode = {0}", code)
        .AsNoTracking()
        .ToList();

            return await Task.FromResult(notification);
        }
    }
}
