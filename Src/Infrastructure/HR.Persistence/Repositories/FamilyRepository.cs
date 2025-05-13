using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Family.Commands.AddFamilyDetails;
using HR.Application.Features.Family.Queries.GetAllFamilyType;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class FamilyRepository : IFamilyRepository
    {
        private readonly AppDbContext _context;

        public FamilyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddFamilyMemberAsync(AddFamilyDetailsCommandDto dto)
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_InsertFamilyMember @Fk_FamilyMemberTypeId = {0}, @EmployeeCode = {1}, @FamilyMemberName = {2}, @BirthDate = {3}, @Age = {4}, @RelationWithEmployee = {5}, @FamilyStatus = {6}",
                dto.Fk_FamilyMemberTypeId,
                dto.EmployeeCode,
                dto.FamilyMemberName,
                dto.BirthDate,
                dto.Age,
                dto.RelationWithEmployee,
                dto.FamilyStatus
            );

            return result > 0;
        }

        public async Task<List<GetAllFamilyMemberTypeQueryVm>> GetAllAsync()
        {
            return await _context.GetAllFamilyTypeMemberVms.FromSqlRaw("EXEC SP_GetFamilyMemberTypes").ToListAsync();
        }
    }

}
