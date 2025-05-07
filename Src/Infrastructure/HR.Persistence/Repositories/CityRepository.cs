using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exception;
using HR.Application.Features.Cities.Commands.CreateCity;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Commands.UpdateCity;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly AppDbContext _context;

        public CityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<City> CreateAsync(CreateCityDto dto)
        {
            if (dto == null)
                throw new CityValidationException("City data cannot be null.");

            if (string.IsNullOrEmpty(dto.CityName))
                throw new CityValidationException("City name is required.");

            if (dto.StateId <= 0)
                throw new CityValidationException("Invalid state ID.");

            var existingCity = await _context.Cities
                 .FromSqlRaw("EXEC dbo.CheckCityDuplicate @CityName = {0}, @StateId = {1}", dto.CityName, dto.StateId)
                 .AsNoTracking()
                 .ToListAsync();
            var foundcity = existingCity.FirstOrDefault();


            if (foundcity != null)
            {
                throw new CityValidationException("A city with the same name already exists in the selected state.");
            }

            var sql = "EXEC SP_CityInsert @Fk_StateId = {0}, @CityName = {1}, @CreatedBy = {2}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.StateId, dto.CityName, dto.CreatedBy);
            return new City
            {
                StateId = dto.StateId,
                CityName = dto.CityName,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                CityStatus = true
            };
        }

        public async Task<City> UpdateAsync(UpdateCityDto dto)
        {
            if (dto == null)
                throw new CityValidationException("City data cannot be null.");

            if (dto.CityId <= 0)
                throw new CityValidationException("Invalid city ID.");

            if (string.IsNullOrEmpty(dto.CityName))
                throw new CityValidationException("City name is required.");

            if (dto.StateId <= 0)
                throw new CityValidationException("Invalid state ID.");

            var sql = "EXEC SP_CityUpdate @CityId = {0}, @Fk_StateId = {1}, @CityName = {2}, @CityStatus = {3}, @UpdatedBy = {4}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.CityId, dto.StateId, dto.CityName, dto.CityStatus, dto.UpdatedBy);
            return new City
            {
                CityId = dto.CityId,
                StateId = dto.StateId,
                CityName = dto.CityName,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
                CityStatus = dto.CityStatus
            };
        }

        public async Task DeleteAsync(int id, int updatedBy)
        {
            if (id <= 0)
                throw new CityValidationException("Invalid city ID.");

            var sql = "EXEC SP_CityDelete @CityId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }

        public async Task<List<CityDto>> GetAllAsync()
        {
            return await _context.CityDtos.FromSqlRaw("EXEC SP_GetAllCities").ToListAsync();
        }
    }

}
