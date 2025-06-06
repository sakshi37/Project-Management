using HR.API.SignalR;
using HR.Application.Contracts.Models.Persistence;
using Microsoft.AspNetCore.SignalR;

namespace HR.API.Broadcast
{
    public class AnnouncementBroadcaster
    {
        private readonly IHubContext<AnnouncementHub> _hubContext;
        private readonly IAnnouncementRepository _queryService;

        public AnnouncementBroadcaster(IHubContext<AnnouncementHub> hubContext, IAnnouncementRepository queryService)
        {
            _hubContext = hubContext;
            _queryService = queryService;
        }

        public async Task BroadcastTodayAnnouncements()
        {
            var announcements = await _queryService.GetTodayAnnouncementsAsync();

            foreach (var ann in announcements)
            {
                if (ann.TargetType == "All")
                    await _hubContext.Clients.All.SendAsync("ReceiveAnnouncement", ann);
                else if (ann.TargetType == "UserGroup")
                    await _hubContext.Clients.Group($"Group_{ann.TargetValue}").SendAsync("ReceiveAnnouncement", ann);
                else if (ann.TargetType == "Employee")
                {
                    foreach (var id in ann.TargetValue.Split(','))
                        await _hubContext.Clients.User(id).SendAsync("ReceiveAnnouncement", ann);
                }
            }
        }
    }

}
