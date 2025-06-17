using Microsoft.AspNetCore.SignalR;

namespace HR.Broadcast.API.Hubs
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public string? GetUserId(HubConnectionContext connection)
        {
            // Extract user identifier from JWT token (e.g., "sub": "NS085")
            //var userId = connection.User?.FindFirst("sub")?.Value;
            var userId = connection.User?.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Console.WriteLine($"CustomUserIdProvider => sub: {userId}");

            return userId;
        }

    }
}
