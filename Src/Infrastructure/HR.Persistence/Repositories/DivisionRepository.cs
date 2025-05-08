using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Designations.Commands.CreateDesignation;
using HR.Application.Features.Designations.Commands.Dtos;
using HR.Application.Features.Designations.Commands.UpdateDesignation;
using HR.Application.Features.Divisions.Command.CreateLocationCommand;
using HR.Application.Features.Divisions.Command.Dto;
using HR.Application.Features.Divisions.Command.UpdateDivision;
using HR.Application.Features.Divisions.Query.GetAllQuery;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class DivisionRepository : IDivisionRepositry
    {
        AppDbContext _context;
        public DivisionRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Division> CreateAsync(CreateDivisionDto dto)
        {

            string sql = "EXEC SP_DivisionInsert @DivisionName={0},@PrefixName={1},@Fk_HolidayId={2},   @ManHours={3}, @DivisionStatus={4},@Fk_ProjectManagerId={5}, @CreatedBy={6}";
            await _context.Database.ExecuteSqlRawAsync(sql,
                dto.DivisionName,
                dto.PrefixName,
                dto.Fk_HolidayId,
                dto.ManHours,
                dto.DivisionStatus,
                dto.ProjectManagerId,
                dto.CreatedBy);
            return new Division
            {
                DivisionName = dto.DivisionName,
                ProjectManagerId = dto.ProjectManagerId,
                PrefixName = dto.PrefixName,
                Fk_HolidayId = dto.Fk_HolidayId,
                ManHours = dto.ManHours,
                DivisionStatus = dto.DivisionStatus,
                CreatedBy = dto.CreatedBy,
            };
        }

        public async Task DeleteAsync(int id, int updatedBy)
        {
            Console.WriteLine($"Deleting DivisionId: {id} by User: {updatedBy}");
            var sql = "EXEC SP_DeleteDivision @DivisionId = {0}, @UpdatedBy = {1}";
            await _context.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }



        public async Task<List<GetAllDivisionQueryDto>> GetAllAsync()
        {
            return await _context.GetAllDivisionQueryVms.FromSqlRaw("EXEC SP_GetAllDivisions").ToListAsync();
        }

        public async Task<Division> UpdateAsync(UpdateDivisionDto dto)
        {
            string sql = "EXEC Rahul.SP_DivisionUpdate @DivisionId={0},@DivisionName={1},@ProjectManagerName={2}, @PrefixName={3},@Fk_HolidayId={4},@ManHours ={5},@DivisionStatus ={6}, @UpdatedBy={7}";
            await _context.Database.ExecuteSqlRawAsync(sql, dto.DivisionId, dto.DivisionName, dto.ProjectManagerName, dto.PrefixName, dto.Fk_HolidayId, dto.ManHours, dto.DivisionStatus, dto.UpdatedBy);
            return new Division
            {

                DivisionId = dto.DivisionId,
                DivisionName = dto.DivisionName,
                ProjectManagerName = dto.ProjectManagerName,
                PrefixName = dto.PrefixName,
                Fk_HolidayId = dto.Fk_HolidayId,
                ManHours = dto.ManHours,
                DivisionStatus = dto.DivisionStatus,
                UpdatedBy = dto.UpdatedBy
            };
        }
    }
}
