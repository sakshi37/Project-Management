using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exception;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Holidays.Commands.CreateHoliday;
using HR.Application.Features.Holidays.Commands.Dtos;
using HR.Application.Features.Holidays.Commands.UpdateHoliday;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class HolidayRepository : IHolidayRepository
    {
        private readonly AppDbContext _context;

        public HolidayRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Holiday> CreateAsync(CreateHolidayDto dto)
        {
            if (string.IsNullOrEmpty(dto.HolidayName))
                throw new HolidayValidationException("Holiday name is required.");


            var existingHoliday = await _context.Set<HolidayDto>()
                 .FromSqlRaw("EXEC SP_CheckHolidayDuplicate @HolidayName = {0}, @HolidayDate = {1}",dto.HolidayName,dto.HolidayDate)
                 .AsNoTracking()
                 .ToListAsync();
            var foundholiday = existingHoliday.FirstOrDefault();


            if (foundholiday != null)
            {
                throw new HolidayValidationException("A Holiday with the same name already exists");
            }
            var sql = "EXEC SP_HolidayInsert @HolidayName = {0}, @HolidayDate = {1}, @HolidayListType = {2}, @CreatedBy = {3}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.HolidayName, dto.HolidayDate, dto.HolidayListType, dto.CreatedBy);
            return new Holiday
            {
                HolidayName = dto.HolidayName,
                HolidayDate = dto.HolidayDate,
                HolidayListType = dto.HolidayListType,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow
            };
        }
        public async Task<Holiday> UpdateAsync(UpdateHolidayDto dto)
        {
            var sql = "EXEC SP_HolidayUpdate @HolidayId = {0}, @HolidayName = {1}, @HolidayDate = {2}, @HolidayListType = {3}, @HolidayStatus = {4}, @UpdatedBy = {5}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.HolidayId, dto.HolidayName, dto.HolidayDate, dto.HolidayListType, dto.HolidayStatus, dto.UpdatedBy);

            return new Holiday
            {
                HolidayId = dto.HolidayId,
                HolidayName = dto.HolidayName,
                HolidayDate = dto.HolidayDate,
                HolidayListType = dto.HolidayListType,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
                HolidayStatus = dto.HolidayStatus
            };
        }
        
        public async Task DeleteAsync(int id, int updatedBy)
        {
            string sql = "EXEC SP_HolidayDelete @HolidayId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }
        public async Task<List<HolidayDto>> GetAllAsync()
        {
            return await _context.HolidayDtos.FromSqlRaw("EXEC SP_GetHolidays").ToListAsync();
        }

    }

}
