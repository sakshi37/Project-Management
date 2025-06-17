using Hangfire;
using HR.Broadcast.API.Configuration;
using HR.Broadcast.API.Hubs;
using HR.Broadcast.API.Jobs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HR.Broadcast.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add controllers & Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Broadcast-specific services
            builder.Services.AddBroadcastServices(builder.Configuration);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]!)
            )
        };

        // ?? Needed for SignalR WebSocket auth
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/announcementHub"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });


            // CORS (Frontend access)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                    policy => policy.WithOrigins("http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials());
            });

            var app = builder.Build();

            // Swagger UI
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();
            app.UseCors("AllowAngular");

            app.UseHttpsRedirection();

           

            // Hangfire
            app.UseHangfireDashboard();
            RecurringJob.AddOrUpdate<AnnouncementBroadcaster>(
                "broadcast-announcements",
                x => x.BroadcastTodayAnnouncements(),
                Cron.Minutely
            );

            // Map SignalR hub
            app.MapHub<AnnouncementHub>("/announcementHub");

            // Web API routes
            app.MapControllers();
            // ?? Add Auth middlewares
            app.UseAuthentication();
            app.UseAuthorization();

            app.Run();
        }
    }
}
