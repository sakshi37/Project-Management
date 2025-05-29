using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Notification.Queries;
using HR.Persistence.Context;
using Microsoft.Data.SqlClient;
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
            try
            {
                var notification = _appDbContext
            .Set<GetNotificationByCodeVm>()
            .FromSqlRaw("EXEC SP_GetNotificationsByEmpCode @EmpCode = {0}", code)
            .AsNoTracking()
            .ToList();

                return await Task.FromResult(notification);
            }
            catch (SqlException ex)
            {

                throw new ApplicationException($"{ex.Message}", ex);
            }
            catch (Exception ex)
            {
                // Handle any other .NET exception
                throw new ApplicationException("An unexpected error occurred while getting the notification.", ex);
            }
        }

        public async Task<int> ReadAndDeleteNotificationAsync(int notificationId)
        {
            try
            {

                var result = await _appDbContext
                    .Database
                    .ExecuteSqlRawAsync("Exec dbo.SP_ReadandDelNotification @NotificationId={0}", notificationId);
                return result;
            }
            catch (SqlException ex)
            {
               
                throw new ApplicationException($"{ex.Message}", ex);
            }
            catch (Exception ex)
            {
                // Handle any other .NET exception
                throw new ApplicationException("An unexpected error occurred while deleting the notification.", ex);
            }
        }

        public async Task<int> ReadNotificationAsync(int notificationId)
        {
            try
            {

                var result = await _appDbContext
                    .Database
                    .ExecuteSqlRawAsync("Exec dbo.SP_ReadNotification @NotificationId={0}", notificationId);
                return result;
            }
            catch (SqlException ex)
            {

                throw new ApplicationException($"{ex.Message}", ex);
            }
            catch (Exception ex)
            {
                // Handle any other .NET exception
                throw new ApplicationException("An unexpected error occurred while deleting the notification.", ex);
            }
        }
    }

}
