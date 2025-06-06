
using Microsoft.AspNetCore.SignalR;

namespace HR.API.SignalR
{
   
    public class AnnouncementHub : Hub
    {

        //public override async Task OnConnectedAsync()
        //{
        //    var userGroup = Context.User?.FindFirst("role")?.Value;
        //    if (!string.IsNullOrEmpty(userGroup))
        //    {
        //        Console.WriteLine($"Connection {Context.ConnectionId} joining group Group_{userGroup}");
        //        await Groups.AddToGroupAsync(Context.ConnectionId, $"Group_{userGroup}");
        //    }
        //    else
        //    {
        //        Console.WriteLine(userGroup);
        //        Console.WriteLine($"Connection {Context.ConnectionId} has no role claim.");
        //    }
        //    await base.OnConnectedAsync();
        //}
        public override async Task OnConnectedAsync()
        {
            var claims = Context.User?.Claims.Select(c => new { c.Type, c.Value }).ToList();
            foreach (var claim in claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Value: {claim.Value}");
            }

            var userGroup = Context.User?.FindFirst("role")?.Value;
            if (string.IsNullOrEmpty(userGroup))
            {
                // Try with the full claim type
                userGroup = Context.User?.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
            }

            if (!string.IsNullOrEmpty(userGroup))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, $"Group_{userGroup}");
            }
            Console.WriteLine($"Connected: {Context.UserIdentifier}");
            await base.OnConnectedAsync();
        }

    }
}
