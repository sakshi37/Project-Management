using HR.Broadcast.API.Hubs;
using HR.Broadcast.API.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace HR.Broadcast.API.Jobs
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
                //else if (ann.TargetType == "UserGroup")
                //    await _hubContext.Clients.Group($"Group_{ann.TargetValue}").SendAsync("ReceiveAnnouncement", ann);
                //else if (ann.TargetType == "Employee")
                //{
                //    foreach (var id in ann.TargetValue.Split(','))
                //        await _hubContext.Clients.User(id).SendAsync("ReceiveAnnouncement", ann);
                //}
                else if (ann.TargetType == "UserGroup" && !string.IsNullOrEmpty(ann.TargetValue))
                {
                    var groupName = $"Group_{ann.TargetValue}";
                    Console.WriteLine($"BroadCasting to UserGroup: {ann.TargetValue}");
                    await _hubContext.Clients.Group(groupName).SendAsync("ReceiveAnnouncement", ann);
                }
                else if (ann.TargetType == "Employee" && !string.IsNullOrEmpty(ann.TargetValue))
                {
                    var empCodes = ann.TargetValue.Split(',');
                    foreach (var empCode in empCodes)
                    {
                        Console.WriteLine($"Broadcasting to employee: {empCode.Trim()}");
                        Console.WriteLine($"Attempting to send to user: {empCode.Trim()}");

                        await _hubContext.Clients.User(empCode.Trim()).SendAsync("ReceiveAnnouncement", ann);
                    }
                }
            }
        }
    }

}

