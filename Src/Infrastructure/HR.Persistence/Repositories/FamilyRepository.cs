using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Family.Commands.AddFamilyDetails;
using HR.Application.Features.Family.Queries.GetAllFamilyType;
using HR.Application.Features.Family.Queries.GetFamilyDetailsByCode;
using HR.Persistence.Context;
using Microsoft.Data.SqlClient;
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
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_InsertFamilyMember @Fk_FamilyMemberTypeId = {0}, @EmployeeCode = {1}, @FamilyMemberName = {2}, @Fk_GenderId={3},@BirthDate = {4}, @Age = {5}, @RelationWithEmployee = {6}, @FamilyStatus = {7}",
                    dto.Fk_FamilyMemberTypeId,
                    dto.EmployeeCode,
                    dto.FamilyMemberName,
                    dto.Fk_GenderId,
                    dto.BirthDate,
                    dto.Age,
                    dto.RelationWithEmployee,
                    dto.FamilyStatus
                );

                return result > 0;
            }
            catch (SqlException ex)
            {
                Console.WriteLine("SQL Error: " + ex.Message);

                if (ex.Message.Contains("Invalid Employee Code"))
                {
                    // Known business rule violation
                    throw new InvalidOperationException("The provided employee code is invalid.");
                }
                else if (ex.Message.Contains("family member type already exists"))
                {
                    throw new InvalidOperationException("This family member type already exists for the employee.");
                }
                else if (ex.Message.Contains("FOREIGN KEY constraint") || ex.Message.Contains("FK_Tbl_FamilyMaster_FamilyMemberTypeMaster"))
                {
                    // Clean message for front-end
                    throw new InvalidOperationException("Please select a valid family member type.");
                }

                // For all other SQL exceptions, return a general message
                throw new InvalidOperationException("An unexpected error occurred while saving family member details.");
            }

        }

        public async Task<List<GetAllFamilyMemberTypeQueryVm>> GetAllAsync()
        {
            return await _context.GetAllFamilyTypeMemberVms.FromSqlRaw("EXEC SP_GetFamilyMemberTypes").ToListAsync();
        }

        public async Task<List<GetFamilyDetailsByCodeQueryVm>> GetFamilyDetailsAsync(string code)
        {
            return await _context.FamilyDetailsByCodeVms
             .FromSqlInterpolated($"EXEC SP_GetEmployeeFamilyDetailsByCode @Code = {code}")
             .ToListAsync();
        }


    }

}
