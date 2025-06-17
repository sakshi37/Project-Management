using HR.Broadcast.API.Features.Commands;
using HR.Broadcast.API.Features.Dtos;

namespace HR.Broadcast.API.Interfaces
{
    public interface IAnnouncementRepository
    {
        Task<string> InsertAsync(AnnouncementDto dto);
        Task<List<AnnouncementDto>> GetTodayAnnouncementsAsync();
        Task<List<AnnouncementDto>> GetAnnouncementsForUserAsync(string employeeCode, string userGroup);
        Task<bool> UpdateAnnouncementAsync(UpdateAnnouncementCommand command);
    }
}
