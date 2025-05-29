using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exception;
using HR.Application.Features.Divisions.Command.CreateLocationCommand;
using HR.Application.Features.Divisions.Command.UpdateDivision;
using HR.Application.Features.Divisions.Query.GetAllQuery;
using HR.Application.Features.Divisions.Query.GetProjectManager;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class DivisionRepository : IDivisionRepositry
    {
        private readonly AppDbContext _context;

        // Constructor to inject DbContext
        public DivisionRepository(AppDbContext context)
        {
            _context = context;
        }

        #region Create Division
        // Creates a new division entry using a stored procedure
        public async Task<division> CreateAsync(CreateDivisionDto dto)
        {
            if (dto == null)
                throw new LocationValidationException("Division data cannot be null.");

            if (string.IsNullOrEmpty(dto.DivisionName))
                throw new LocationValidationException("Division name is required.");

            // Validates the Holiday ID value
            if (dto.Fk_HolidayId < 0 && dto.Fk_HolidayId > 1)
                throw new LocationValidationException("Invalid Holiday ID.");

            // Check for duplicate division name using stored procedure
            var existingDivision = await _context.DivisionDtos
                 .FromSqlRaw("EXEC CheckDivisionDuplicate @DivisionName = {0}", dto.DivisionName)
                 .AsNoTracking()
                 .ToListAsync();
            var foundDivision = existingDivision.FirstOrDefault();

            if (foundDivision != null)
            {
                throw new LocationValidationException("A Division with the same name already exists.");
            }

            // Insert division using stored procedure
            string sql = "EXEC SP_DivisionInsert @DivisionName={0},@ProjectManagerName={1},@PrefixName={2},@Fk_HolidayId={3},@ManHours={4}, @DivisionStatus={5}, @CreatedBy={6},@Fk_BranchId={7}";
            await _context.Database.ExecuteSqlRawAsync(sql,
                dto.DivisionName,
                dto.ProjectManagerName,
                dto.PrefixName,
                dto.Fk_HolidayId,
                dto.ManHours,
                dto.DivisionStatus,
                dto.CreatedBy,
                dto.Fk_BranchId);

            // Return the created division object (for confirmation)
            return new division
            {
                DivisionName = dto.DivisionName,
                ProjectManagerName = dto.ProjectManagerName,
                PrefixName = dto.PrefixName,
                Fk_HolidayId = dto.Fk_HolidayId,
                ManHours = dto.ManHours,
                DivisionStatus = dto.DivisionStatus,
                CreatedBy = dto.CreatedBy,
                Fk_BranchId = dto.Fk_BranchId
            };
        }
        #endregion

        #region Delete Division
        // Deletes a division entry using a stored procedure
        public async Task DeleteAsync(int id, int updatedBy)
        {
            Console.WriteLine($"Deleting DivisionId: {id} by User: {updatedBy}");

            string sql = "EXEC SP_DeleteDivision @DivisionId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }
        #endregion

        #region Get All Divisions
        // Retrieves all divisions using a stored procedure
        public async Task<List<GetAllDivisionDto>> GetAllAsync()
        {
            return await _context.GetAllDivisionQueryDtos.FromSqlRaw("EXEC Rahul.SP_GetAllDivisions").ToListAsync();
        }
        #endregion

        #region Update Division
        // Updates division data using a stored procedure
        public async Task<division> UpdateAsync(UpdateDivisionDto dto)
        {
            string sql = "EXEC Rahul.UpdateDivision @DivisionId={0},@DivisionName={1},@ProjectManagerName={2}, @PrefixName={3},@HolidayId={4},@ManHours ={5},@DivisionStatus ={6}, @UpdatedBy={7},@Fk_BranchId={8}";

            await _context.Database.ExecuteSqlRawAsync(sql,
                dto.DivisionId,
                dto.DivisionName,
                dto.ProjectManagerName,
                dto.PrefixName,
                dto.Fk_HolidayId,
                dto.ManHours,
                dto.DivisionStatus,
                dto.UpdatedBy,
                dto.Fk_BranchId);

            // Return the updated division object (for confirmation)
            return new division
            {
                DivisionId = dto.DivisionId,
                DivisionName = dto.DivisionName,
                ProjectManagerName = dto.ProjectManagerName,
                PrefixName = dto.PrefixName,
                Fk_HolidayId = dto.Fk_HolidayId,
                ManHours = dto.ManHours,
                DivisionStatus = dto.DivisionStatus,
                UpdatedBy = dto.UpdatedBy,
                Fk_BranchId = dto.Fk_BranchId
            };
        }
        #endregion

        #region Get All Project Managers
        // Fetches all project managers from a remote schema using a stored procedure
        public async Task<List<GetAllProjectManagerDto>> GetAllPMAsync()
        {
            string sql = "EXEC [remote].[GetProjectManager]";
            var pms = await _context.GetAllProjectManagerDtos.FromSqlRaw(sql).ToListAsync();
            return pms;
        }
        #endregion
    }
}
