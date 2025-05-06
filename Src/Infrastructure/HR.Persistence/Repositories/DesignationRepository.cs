using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Designations.Commands.CreateDesignation;
using HR.Application.Features.Designations.Commands.Dtos;
using HR.Application.Features.Designations.Commands.UpdateDesignation;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class DesignationRepository : IDesignationRepository
    {
        private readonly AppDbContext _context;

        public DesignationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Designation> CreateAsync(CreateDesignationDto dto)
        {
            string sql = "EXEC SP_DesignationInsert @DesignationName = {0}, @CreatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.DesignationName,dto.CreatedBy);

            return new Designation
            {
                DesignationName = dto.DesignationName,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                DesignationStatus = true
            };
        }

        public async Task<Designation> UpdateAsync(UpdateDesignationDto dto)
        {
            string sql = "EXEC SP_DesignationUpdate @DesignationId = {0}, @DesignationName = {1},@DesignationStatus = {2}, @UpdatedBy = {3}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.DesignationId, dto.DesignationName, dto.DesignationStatus, dto.UpdatedBy);

            return new Designation
            {
                DesignationId = dto.DesignationId,
                DesignationName = dto.DesignationName,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
                DesignationStatus = dto.DesignationStatus
            };
        }

        public async Task DeleteAsync(int id, int updatedBy)
        {
            string sql = "EXEC SP_DesignationDelete @DesignationId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }

        public async Task<List<DesignationDto>> GetAllAsync()
        {
            return await _context.DesignationDtos.FromSqlRaw("EXEC SP_GetAllDesignations").ToListAsync();
        }

        public async Task<DesignationDto> GetByIdAsync(int id)
        {

            return await _context.DesignationDtos.FromSqlRaw("EXEC SP_GetDesignationById @DesignationId = {0}", id).FirstOrDefaultAsync();
        }
    }
}
