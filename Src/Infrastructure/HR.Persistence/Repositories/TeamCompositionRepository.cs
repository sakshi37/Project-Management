using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using HR.Application.Features.TeamCompositions.Commands.UpdateTeamComposition;
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
            string teamMemberString = dto.TeamMembers != null && dto.TeamMembers.Any()
                ? string.Join(",", dto.TeamMembers)
                : null;

            var parameters = new[]
            {
        new SqlParameter("@TeamName", dto.TeamName),
        new SqlParameter("@Fk_BranchId", dto.Fk_BranchId),
        new SqlParameter("@Fk_DivisionId", dto.Fk_DivisionId),
        new SqlParameter("@Fk_TeamLeaderId", dto.Fk_TeamLeaderId),
        new SqlParameter("@TeamMemberIds", (object)teamMemberString ?? DBNull.Value),
        new SqlParameter("@CreatedBy", dto.CreatedBy),
    };

            string sql = "EXEC SP_TeamCompositionInsert @TeamName, @Fk_BranchId, @Fk_DivisionId, @Fk_TeamLeaderId, @TeamMemberIds, @CreatedBy";

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return new TeamComposition
            {
                TeamName = dto.TeamName,
                Fk_BranchId = dto.Fk_BranchId,
                Fk_DivisionId = dto.Fk_DivisionId,
                Fk_TeamLeaderId = dto.Fk_TeamLeaderId,
                CreatedBy = dto.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                TeamStatus = true,
            };
        }

        //public async Task<List<TeamCompositionDto>> GetAllAsync()
        //{
        //    string sql = "EXEC SP_TeamCompositionGetAll";
        //    return await _context.TeamCompositionDtos.FromSqlRaw(sql).ToListAsync();
        //}

        //public async Task<List<TeamCompositionDto>> GetAllAsync(int? branchId = null, int? divisionId = null)
        //{
        //    var parameters = new[]
        //    {
        //    new SqlParameter("@BranchId", branchId ?? (object)DBNull.Value),
        //    new SqlParameter("@DivisionId", divisionId ?? (object)DBNull.Value)
        //     };

        //    string sql = "EXEC SP_TeamCompositionGetAll @BranchId, @DivisionId";
        //    return await _context.TeamCompositionDtos
        //        .FromSqlRaw(sql, parameters)
        //        .ToListAsync();
        //}
        //    public async Task<List<TeamCompositionDto>> GetAllAsync(int? branchId = null, int? divisionId = null)
        //    {
        //        var parameters = new[]
        //        {
        //    new SqlParameter("@BranchId", branchId ?? (object)DBNull.Value),
        //    new SqlParameter("@DivisionId", divisionId ?? (object)DBNull.Value)
        //};

        //        // Step 1: Fetch core team composition data
        //        var teams = await _context.TeamCompositionDtos
        //            .FromSqlRaw("EXEC SP_TeamCompositionGetAll @BranchId, @DivisionId", parameters)
        //            .ToListAsync();



        //        return teams;
        //    }

        public async Task<List<TeamCompositionDto>> GetAllAsync(int? branchId = null, int? divisionId = null)
        {
            var parameters = new[]
            {
        new SqlParameter("@BranchId", branchId ?? (object)DBNull.Value),
        new SqlParameter("@DivisionId", divisionId ?? (object)DBNull.Value)
    };

            var results = await _context.TeamCompositionDtos
                .FromSqlRaw("EXEC SP_TeamCompositionGetAll @BranchId, @DivisionId", parameters)
                .ToListAsync();
            foreach (var team in results)
            {
                if (!string.IsNullOrWhiteSpace(team.TeamMembers))
                {
                    team.TeamMemberIds = team.TeamMembers
                        .Split(',', StringSplitOptions.RemoveEmptyEntries)
                        .Select(id => int.Parse(id.Trim()))
                        .ToList();
                }
                else
                {
                    team.TeamMemberIds = new List<int>();
                }
            }


            return results;
        }


        public async Task<List<TeamLeaderDto>> GetTeamLeadersAsync()
        {
            string sql = "EXEC SP_GetTeamLeaders";
            return await _context.TeamLeaderDtos.FromSqlRaw(sql).ToListAsync();
        }

        //public async Task<TeamComposition> UpdateAsync(UpdateTeamCompositionDto team)
        //{
        //    string sql = "EXEC SP_TeamCompositionUpdate @TeamId={0}, @TeamName={1}, @Fk_BranchId={2}, @Fk_DivisionId={3}, @Fk_TeamLeaderId={4}, @TeamStatus={5}, @UpdatedBy={6}";
        //    await _context.Database.ExecuteSqlRawAsync(sql,
        //        team.TeamId,
        //        team.TeamName,
        //        team.Fk_BranchId,
        //        team.Fk_DivisionId,
        //        team.Fk_TeamLeaderId,
        //        team.TeamStatus,
        //        team.UpdatedBy);

        //    return new TeamComposition
        //    {
        //        TeamId = team.TeamId,
        //        TeamName = team.TeamName,
        //        Fk_BranchId = team.Fk_BranchId,
        //        Fk_DivisionId = team.Fk_DivisionId,
        //        Fk_TeamLeaderId = team.Fk_TeamLeaderId,
        //        UpdatedBy = team.UpdatedBy,
        //        UpdatedDate = DateTime.UtcNow,
        //        TeamStatus = team.TeamStatus
        //    };
        //}
        public async Task<TeamComposition> UpdateAsync(UpdateTeamCompositionDto dto)
        {
            string teamMemberString = dto.TeamMembers != null && dto.TeamMembers.Any()
                ? string.Join(",", dto.TeamMembers)
                : null;

            string sql = "EXEC SP_TeamCompositionUpdate " +
                         "@TeamId = {0}, @TeamName = {1}, @Fk_BranchId = {2}, @Fk_DivisionId = {3}, " +
                         "@Fk_TeamLeaderId = {4}, @TeamStatus = {5}, @TeamMemberIds = {6}, @UpdatedBy = {7}";

            await _context.Database.ExecuteSqlRawAsync(sql,
                dto.TeamId,
                dto.TeamName,
                dto.Fk_BranchId,
                dto.Fk_DivisionId,
                dto.Fk_TeamLeaderId,
                dto.TeamStatus,
                teamMemberString,
                dto.UpdatedBy);

            return new TeamComposition
            {
                TeamId = dto.TeamId,
                TeamName = dto.TeamName,
                Fk_BranchId = dto.Fk_BranchId,
                Fk_DivisionId = dto.Fk_DivisionId,
                Fk_TeamLeaderId = dto.Fk_TeamLeaderId,
                TeamStatus = dto.TeamStatus,
                UpdatedBy = dto.UpdatedBy,
                UpdatedDate = DateTime.UtcNow
            };
        }

    }
}
