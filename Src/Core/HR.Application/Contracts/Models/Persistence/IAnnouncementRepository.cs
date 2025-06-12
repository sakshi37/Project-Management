using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Annoucements.Commands.UpdateAnnouncement;
using HR.Application.Features.Annoucements.Dtos;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IAnnouncementRepository
    {
        Task<string> InsertAsync(BroadcastAnnouncementDto dto);
        Task<List<BroadcastAnnouncementDto>> GetTodayAnnouncementsAsync();
        Task<List<BroadcastAnnouncementDto>> GetAnnouncementsForUserAsync(string employeeCode, string userGroup);
        Task<bool> UpdateAnnouncementAsync(UpdateAnnouncementCommand command);

    }

}
