using ArtSystem.Api.Middleware;
using HR.Application;
using HR.Application.Contracts;
using HR.Application.Contracts.Persistence;
using HR.Application.Profiles;
using HR.Domain.Entities;
using HR.Persistence;
using HR.Persistence.Context;
using HR.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.EntityFrameworkCore;
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

            // Register DbContext
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connString),
                ServiceLifetime.Scoped
            );

            // Register Application Services
            builder.Services.AddApplicationServices();
            builder.Services.AddServiceRegistration(builder.Configuration);

            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));


            builder.Services.AddMemoryCache();

            // JWT Settings
            //builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
            //var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();

            //builder.Services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,

            //        ValidIssuer = jwtSettings.Issuer,
            //        ValidAudience = jwtSettings.Audience,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
            //        ClockSkew = TimeSpan.Zero
            //    };
            //});

            builder.Services.AddPersistenceServices(builder.Configuration);

            // Register AutoMapper
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseHttpsRedirection();

            // Enable authentication and authorization
            app.UseAuthentication(); // <-- Added
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
