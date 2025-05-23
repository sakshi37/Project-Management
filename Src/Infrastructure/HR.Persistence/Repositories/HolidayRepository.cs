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
using Microsoft.AspNetCore.Http;
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

        //public async Task<Holiday> CreateAsync(CreateHolidayDto dto)
        //{
        //    if (string.IsNullOrEmpty(dto.HolidayName))
        //        throw new HolidayValidationException("Holiday name is required.");


           
        //    var imagePath = await SaveImageAsync(dto.Image);

        //    var sql = "EXEC SP_HolidayInsert @HolidayName = {0}, @HolidayDate = {1}, @HolidayListType = {2} , @ImagePath = {3}, @CreatedBy = {4}";
        //    await _context.Database.ExecuteSqlRawAsync(sql, dto.HolidayName, dto.HolidayDate, dto.HolidayListType,dto.Image, dto.CreatedBy);
        //    return new Holiday
        //    {
        //        HolidayName = dto.HolidayName,
        //        HolidayDate = dto.HolidayDate,
        //        HolidayListType = dto.HolidayListType,
        //        ImagePath = imagePath,
        //        CreatedBy = dto.CreatedBy,
        //        CreatedDate = DateTime.UtcNow
        //    };
        //}
        public async Task<Holiday> CreateAsync(CreateHolidayDto dto)
        {
            if (string.IsNullOrEmpty(dto.HolidayName))
                throw new HolidayValidationException("Holiday name is required.");
            //var existingHoliday = await _context.Set<HolidayDto>()
            //     .FromSqlRaw("EXEC SP_CheckHolidayDuplicate @HolidayName = {0}, @HolidayDate = {1}", dto.HolidayName, dto.HolidayDate)
            //     .AsNoTracking()
            //     .ToListAsync();
            //var foundholiday = existingHoliday.FirstOrDefault();


            //if (foundholiday != null)
            //{
            //    throw new HolidayValidationException("A Holiday with the same name already exists");

            //}

            var imagePath = await SaveImageAsync(dto.Image);

            var sql = "EXEC SP_HolidayInsert @HolidayName = {0}, @HolidayDate = {1}, @HolidayListType = {2}, @ImagePath = {3}, @CreatedBy = {4}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.HolidayName, dto.HolidayDate, dto.HolidayListType, imagePath, dto.CreatedBy);

            return new Holiday
            {
                HolidayName = dto.HolidayName,
                HolidayDate = dto.HolidayDate,
                HolidayListType = dto.HolidayListType,
                ImagePath = imagePath,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow
            };
        }

        //public async Task<Holiday> UpdateAsync(UpdateHolidayDto dto)
        //{
        //    var imagePath = await SaveImageAsync(dto.Image);

        //    var sql = "EXEC SP_HolidayUpdate @HolidayId = {0}, @HolidayName = {1}, @HolidayDate = {2}, @HolidayListType = {3}, @HolidayStatus = {4}, @ImagePath = {5}, @UpdatedBy = {6}";
        //    await _context.Database.ExecuteSqlRawAsync(sql, dto.HolidayId, dto.HolidayName, dto.HolidayDate, dto.HolidayListType, dto.HolidayStatus,dto.Image, dto.UpdatedBy);

        //    return new Holiday
        //    {
        //        HolidayId = dto.HolidayId,
        //        HolidayName = dto.HolidayName,
        //        HolidayDate = dto.HolidayDate,
        //        HolidayListType = dto.HolidayListType,
        //        ImagePath = imagePath,
        //        UpdatedBy = dto.UpdatedBy,
        //        UpdatedDate = DateTime.UtcNow,
        //        HolidayStatus = dto.HolidayStatus
        //    };
        //}
        public async Task<Holiday> UpdateAsync(UpdateHolidayDto dto)
        {
            var imagePath = await SaveImageAsync(dto.Image);

            var sql = "EXEC SP_HolidayUpdate @HolidayId = {0}, @HolidayName = {1}, @HolidayDate = {2}, @HolidayListType = {3}, @HolidayStatus = {4}, @ImagePath = {5}, @UpdatedBy = {6}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.HolidayId, dto.HolidayName, dto.HolidayDate, dto.HolidayListType, dto.HolidayStatus, imagePath, dto.UpdatedBy);

            return new Holiday
            {
                HolidayId = dto.HolidayId,
                HolidayName = dto.HolidayName,
                HolidayDate = dto.HolidayDate,
                HolidayListType = dto.HolidayListType,
                ImagePath = imagePath,
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

        private async Task<string?> SaveImageAsync(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0) return null;

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "holidays");
            Directory.CreateDirectory(folderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return Path.Combine("uploads", "holidays", fileName).Replace("\\", "/");
        }

    }

}
