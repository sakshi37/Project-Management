using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Branches.Commands.CreateBranch;
using HR.Application.Features.Branches.Commands.Dtos;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class BranchRepository : IBranchRepository
    {
        private readonly AppDbContext _appcontext;

        public BranchRepository(AppDbContext context)
        {
            _appcontext = context;
        }
        public async Task<BranchDto> CreateAsync(CreateBranchDto dto)
        {
            var sql = "EXEC SP_BranchInsert @Fk_CityId = {0}, @BranchName = {1}, @BranchStatus = {2}, @CreatedBy = {3}";
            await _appcontext.Database.ExecuteSqlRawAsync(sql, dto.Fk_CityId, dto.BranchName, true, dto.CreatedBy);

            // Fetch city and state info after insertion
            var cityData = await _appcontext
                .CityDtos
                .FromSqlRaw(@"
            SELECT 
                c.CityId, 
                c.CityName, 
                s.StateName, 
                c.CityStatus, 
                s.StateId, 
                '' AS CountryName 
            FROM Tbl_CityMaster c
            JOIN Tbl_StateMaster s ON c.Fk_StateId = s.StateId
            WHERE c.CityId = {0}", dto.Fk_CityId)
                .FirstOrDefaultAsync();

            return new BranchDto
            {
                BranchName = dto.BranchName,
                CityId = dto.Fk_CityId,
                CityName = cityData?.CityName ?? "",
                StateName = cityData?.StateName ?? "",
                BranchStatus = true
            };
        }

        public async Task<List<BranchDto>> GetAllAsync()
        {
            return await _appcontext.BranchDtos.FromSqlRaw("EXEC SP_GetAllBranches").ToListAsync();
        }
        public async Task DeleteAsync(int id, int updatedBy)
        {
            var sql = "EXEC SP_BranchDelete @BranchId = {0}, @UpdatedBy = {1}";
             await _appcontext.Database.ExecuteSqlRawAsync(sql, id, updatedBy);
        }
    }
}
