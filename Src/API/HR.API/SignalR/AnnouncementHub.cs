
using Microsoft.AspNetCore.SignalR;

namespace HR.API.SignalR
{
   
    public class AnnouncementHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            // Optional: Add to group based on user’s UserGroupId or EmployeeId
            await base.OnConnectedAsync();
        }
    }
}
