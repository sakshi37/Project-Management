using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class TeamCompositionRepository : ITeamCompositionRepository
    {
        private readonly AppDbContext _context;
        public TeamCompositionRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<TeamComposition> CreateAsync(CreateTeamCompositionDto dto)
        {
            string sql = "EXEC SP_TeamCompositionInsert @TeamName = {0}, @Fk_BranchId = {1}, @Fk_DivisionId = {2}, @Fk_TeamLeaderId = {3}, @CreatedBy = {4}";

            await _context.Database.ExecuteSqlRawAsync(sql,
                dto.TeamName,
                dto.Fk_BranchId,
                dto.Fk_DivisionId,
                dto.Fk_TeamLeaderId,
                dto.CreatedBy);

            return new TeamComposition
            {
                TeamName = dto.TeamName,
                Fk_BranchId = dto.Fk_BranchId,
                Fk_DivisionId = dto.Fk_DivisionId,
                Fk_TeamLeaderId = dto.Fk_TeamLeaderId,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                TeamStatus = true
            };
        }
        //public async Task<List<TeamCompositionDto>> GetAllAsync()
        //{
        //    string sql = "EXEC SP_TeamCompositionGetAll";
        //    return await _context.TeamCompositionDtos.FromSqlRaw(sql).ToListAsync();
        //}

        public async Task<List<TeamCompositionDto>> GetAllAsync(int? branchId = null, int? divisionId = null)
        {
            var parameters = new[]
            {
            new SqlParameter("@BranchId", branchId ?? (object)DBNull.Value),
            new SqlParameter("@DivisionId", divisionId ?? (object)DBNull.Value)
             };

            string sql = "EXEC SP_TeamCompositionGetAll @BranchId, @DivisionId";
            return await _context.TeamCompositionDtos
                .FromSqlRaw(sql, parameters)
                .ToListAsync();
        }
        public async Task<List<TeamLeaderDto>> GetTeamLeadersAsync()
        {
            string sql = "EXEC SP_GetTeamLeaders";
            return await _context.TeamLeaderDtos.FromSqlRaw(sql).ToListAsync();
        }

    }
}
