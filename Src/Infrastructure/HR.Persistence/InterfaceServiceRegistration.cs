
using HR.Application.Contracts;
using System.Text;
using HR.Application.Contracts.Models.Persistence;
using HR.Identity.Services;
using HR.Persistence.Context;
using HR.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;



namespace HR.Persistence
{
    public static class InterfaceServiceRegistration
    {
        public static IServiceCollection AddServiceRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("HrConnString")));
            services.AddScoped<ILoginService, LoginServices>();
            services.AddScoped<IDailyReport, DailyReportRepository>();
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = configuration["JwtSettings:Issuer"],
                    ValidAudience = configuration["JwtSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"])),
                    ClockSkew = TimeSpan.Zero
                };
            });



            return services;
        }
    }
}