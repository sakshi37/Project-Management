using HR.Application;
using HR.Application.Profiles;
using HR.Persistence;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;


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

            builder.Services.AddPersistenceServices(builder.Configuration);


            // Register Repositories


            // Register AutoMapper
            builder.Services.AddAutoMapper(typeof(MappingProfile));  // Ensure MappingProfile is the correct profile class

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // CORS policy
            

            var app = builder.Build();
            app.UseCors(x => x
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());

            // Use CORS
            //app.UseCors("MyPolicy");

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
