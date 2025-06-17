using ArtSystem.Api.Middleware;
using Hangfire;

using HR.Application;
using HR.Application.Contracts;
using HR.Application.Contracts.Persistence;
using HR.Application.Profiles;
using HR.Domain.Entities;
using HR.Persistence;
using HR.Persistence.Context;
using HR.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HR.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connString = builder.Configuration.GetConnectionString("HrConnString");

            // DbContext
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connString),
                ServiceLifetime.Scoped);

            // App + Infra
            builder.Services.AddApplicationServices();
            builder.Services.AddServiceRegistration(builder.Configuration);
            builder.Services.AddPersistenceServices(builder.Configuration);

            // Email + JWT
            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

            // SignalR
            //builder.Services.AddSignalR();

            // Hangfire
            //builder.Services.AddHangfire(config =>
            //    config.UseSqlServerStorage(builder.Configuration.GetConnectionString("HrConnString")));
            //builder.Services.AddHangfireServer();

            // Register broadcaster for DI
            //builder.Services.AddScoped<AnnouncementBroadcaster>();

            // AutoMapper
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

            builder.Services.AddMemoryCache();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                    policy => policy.WithOrigins("http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials());
            });
            var app = builder.Build();

            //// Hangfire dashboard
            //app.UseHangfireDashboard();

            //// Run job AFTER app is built
            //RecurringJob.AddOrUpdate<AnnouncementBroadcaster>(
            //    "broadcast-announcements",
            //    x => x.BroadcastTodayAnnouncements(),
            //    //Cron.Daily
            //    Cron.Minutely
            //);

            // Serve uploaded files
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads")),
                RequestPath = "/wwwroot/uploads"
            });

            //app.UseCors(x => x
            //    .AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());
            

            app.UseCors("AllowAngular");

            // Swagger + Error middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            //app.MapHub<AnnouncementHub>("/announcementHub");

            app.Run();
        }
    }
}
