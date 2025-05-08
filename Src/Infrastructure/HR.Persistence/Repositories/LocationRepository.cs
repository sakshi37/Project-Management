using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Dtos;
using HR.Application.Features.Locations.Commands.CreateLocation;
using HR.Application.Features.Locations.Commands.UpdateLocation;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        readonly AppDbContext _context;
        public LocationRepository(AppDbContext context)
        {
            _context = context;

        }
        public async Task<Location> CreateAsync(CreateLocationDto dto)
        {
            string sql = "EXEC SP_LocationInsert @Fk_CityId = {0}, @LocationName = {1},@LocationStatus = {2}, @CreatedBy = {3}";
            int rowEffeted = await _context.Database.ExecuteSqlRawAsync(sql, dto.CityId, dto.LocationName, true, dto.CreatedBy);
            if(rowEffeted < 1)
            {
                throw new Exception("Insert Failed :(");
            }
            return new Location
            {
                Fk_CityId = dto.CityId,
                LocationName = dto.LocationName,
                LocationStatus = true,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow
            };
        }

        public async Task DeleteAsync(int id, int UpdatedBy)
        {
            
                string sql = "EXEC SP_LocationDelete @LocationId = {0}, @UpdatedBy = {1}";
                await _context.Database.ExecuteSqlRawAsync(sql, id, UpdatedBy);
            
        }

        public async Task<List<LocationDto>> GetAllAsync()
        {
            try
            {
                return await _context.LocationDtos.FromSqlRaw("EXEC SP_LocationGetALL").ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new List<LocationDto>();
            }
        }

        //public async Task<LocationDto> GetByIdAsync(int id)
        //{
        //   return await _context.LocationDto.FromSqlRaw("EXEC SP_GetLocationById @LocationId = {0}", id).FirstOrDefaultAsync();
        //}

        public async  Task<Location> UpdateAsync(UpdateLocationDto dto)
        {
            string sql = "EXEC SP_LocationUpdate @LocationId = {0}, @LocationName = {1},@Fk_CityId= {2}, @LocationStatus = {3}, @UpdatedBy = {4}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.LocationId, dto.LocationName,dto.CityId, dto.LocationStatus, dto.UpdatedBy);
            

            return new Location
            {
                LocationId = dto.LocationId,
                LocationName = dto.LocationName,
                Fk_CityId = dto.CityId,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
                LocationStatus = dto.LocationStatus
            };
        }
    }
    }

