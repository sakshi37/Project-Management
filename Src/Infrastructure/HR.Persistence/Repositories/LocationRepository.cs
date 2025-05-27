using HR.Application.Contracts.Persistence;
using HR.Application.Exception;
using HR.Application.Exceptions;
using HR.Application.Features.Locations.Commands.CreateLocation;
using HR.Application.Features.Locations.Commands.UpdateLoation;
using HR.Application.Features.Locations.Dtos;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly AppDbContext _context;

        public LocationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Location> CreateAsync(CreateLocationDto dto)
        {
            if (dto == null)
                throw new LocationValidationException("Location data cannot be null.");

            if (string.IsNullOrEmpty(dto.LocationName))
                throw new LocationValidationException("Location name is required.");

            if (dto.CityId <= 0)
                throw new LocationValidationException("Invalid City ID.");


            var existingLocation = await _context.Locations
                 .FromSqlRaw("EXEC CheckLocationDuplicate @LocationName = {0}", dto.LocationName)
                 .AsNoTracking()
                 .ToListAsync();
            var foundcity = existingLocation.FirstOrDefault();


            if (foundcity != null)
            {
                throw new LocationValidationException("A location with the same name already exists in the selected state.");
            }
            var sql = "EXEC SP_LocationInsert @Fk_CityId = {0}, @LocationName = {1}, @LocationStatus = {2}, @CreatedBy = {3}";
            int addLocation = await _context.Database.ExecuteSqlRawAsync(sql, dto.CityId, dto.LocationName, dto.LocationStatus, dto.CreatedBy);
            if(addLocation < 0)
            {
                throw new Exception("For some reasons, location not added.");
            }
            return new Location
            {
                LocationName = dto.LocationName,
                LocationStatus = true,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow
            };
        }

        public async Task<Location> UpdateAsync(UpdateLocationDto dto)
        {
            {
                if (dto == null)
                    throw new LocationValidationException("Location data cannot be null.");

                if (dto.CityId <= 0)
                    throw new LocationValidationException("Invalid Location ID.");

                if (string.IsNullOrEmpty(dto.LocationName))
                    throw new LocationValidationException("Location name is required.");

                if (dto.CityId <= 0)
                    throw new LocationValidationException("Invalid city ID.");


                string sql = "EXEC SP_LocationUpdate @LocationId = {0},@Fk_CityId = {1}, @LocationName = {2},  @LocationStatus = {3}, @UpdatedBy = {4}";
                int rowsAffected = await _context.Database.ExecuteSqlRawAsync(sql, dto.LocationId, dto.CityId, dto.LocationName, dto.LocationStatus, dto.UpdatedBy);

                if (rowsAffected < 1)
                {
                    throw new Exception("Update Failed :(");
                }

                return new Location
                {
                    LocationId = dto.LocationId,
                    Fk_CityId = dto.CityId,
                    LocationName = dto.LocationName,
                    LocationStatus = dto.LocationStatus,
                    UpdatedBy = dto.UpdatedBy,
                    UpdatedDate = DateTime.UtcNow
                };
            }
        }


        public async Task DeleteAsync(int id, int updatedBy)
        {
            if (id <= 0)
                throw new LocationValidationException("Invalid Location ID.");

            var sql = "EXEC SP_LocationDelete @LocationId = {0}, @UpdatedBy = {1}";
            int rowsAffected = await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);

            if (rowsAffected < 1)
            {
                throw new Exception("Delete Failed :(");
            }
        }




        public async Task<List<LocationDto>> GetAllAsync()
        {
            var result = await _context.LocationDtos.FromSqlRaw("EXEC SP_LocationGetAll").ToListAsync();
            if (result == null)
                throw new NotFoundException("Location Records not found");
            return result;
        }


    }
}
