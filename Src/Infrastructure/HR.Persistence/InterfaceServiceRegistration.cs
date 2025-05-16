
using HR.Application.Contracts.Models.Persistence;
using HR.Identity.Services;
using HR.Persistence.Context;
using HR.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



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



            return services;
        }
    }
}