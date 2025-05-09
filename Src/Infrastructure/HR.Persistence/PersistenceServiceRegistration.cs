﻿using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Persistence.Context;
using HR.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HR.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("HrConnString")));
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<IStateRepository, StateRepository>();
            services.AddScoped<IDesignationRepository, DesignationRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IHolidayRepository, HolidayRepository>();
            services.AddScoped<ITimeSheetRepository, TimeSheetRepository>();
            services.AddScoped<IEmployeeMasterRepository, EmployeeRepository>();
            services.AddScoped<ILocationMasterRepository, LocationMasterRepository>();
            services.AddScoped<IStateRepository, StateRepository>();
            services.AddScoped<IBranchRepository, BranchRepository>();




            return services;
        }
    }
}
