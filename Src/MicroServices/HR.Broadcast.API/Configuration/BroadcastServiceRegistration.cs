using System.Reflection;
using Hangfire;
using HR.Broadcast.API.Hubs;
using HR.Broadcast.API.Interfaces;
using HR.Broadcast.API.Jobs;
using HR.Broadcast.API.Profiles;
using HR.Broadcast.API.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace HR.Broadcast.API.Configuration
{
    public static class BroadcastServiceRegistration
    {
        public static IServiceCollection AddBroadcastServices(this IServiceCollection services , IConfiguration configuration)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
            services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
            services.AddScoped<AnnouncementBroadcaster>();
            services.AddSignalR();
            services.AddHangfire(config =>
                            config.UseSqlServerStorage(configuration.GetConnectionString("HrConnString")));
            services.AddHangfireServer();
            return services;
        }
    }
}
