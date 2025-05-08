using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly AppDbContext _context;

        public CountryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Country> CreateAsync(CreateCountryDto dto)
        {
            string sql = "EXEC SP_CountryInsert @CountryName = {0}, @CountryCode = {1}, @CreatedBy = {2}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.CountryName, dto.CountryCode, dto.CreatedBy);

            return new Country
            {
                CountryName = dto.CountryName,
                CountryCode = dto.CountryCode,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                CountryStatus = true
            };
        }

        public async Task<Country> UpdateAsync(UpdateCountryDto dto)
        {
            string sql = "EXEC SP_CountryUpdate @CountryId = {0}, @CountryName = {1}, @CountryCode = {2}, @CountryStatus = {3}, @UpdatedBy = {4}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.CountryId, dto.CountryName, dto.CountryCode, dto.CountryStatus, dto.UpdatedBy);

            return new Country
            {
                CountryId = dto.CountryId,
                CountryName = dto.CountryName,
                CountryCode = dto.CountryCode,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
                CountryStatus = dto.CountryStatus
            };
        }

        public async Task DeleteAsync(int id, int updatedBy)
        {
            string sql = "EXEC SP_CountryDelete @CountryId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }

        public async Task<List<CountryDto>> GetAllAsync()
        {
            return await _context.CountryDtos.FromSqlRaw("EXEC SP_GetAllCountries").ToListAsync();
        }

        public async Task<CountryDto> GetByIdAsync(int id)
        {

            return await _context.CountryDtos
                .FromSqlRaw("EXEC SP_GetCountryById @CountryId = {0}", id).FirstOrDefaultAsync();
        }
    }

}