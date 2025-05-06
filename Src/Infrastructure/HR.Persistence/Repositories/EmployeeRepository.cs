using System.Data;
using HR.Application.Contracts.Models.Common;
using HR.Application.Contracts.Persistence;
using HR.Application.Features.Employee.Queries.GetEmployeeProfile;
using HR.Application.Features.Employees.Queries.GetAllEmployees;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class EmployeeRepository : IEmployeeMasterRepository
    {
        readonly AppDbContext _appDbContext;
        public EmployeeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;

        }
         public async Task<PaginatedResult<GetAllEmployeeVm>> GetAllEmployeeSummaryPagedAsync(int pageNumber, int pageSize)
        {
            var allData = await _appDbContext.GetAllEmployeeVms
                .FromSqlRaw("EXEC SP_GetAllEmployeeSummary")
                .ToListAsync();

            var totalCount = allData.Count;

            var pagedData = allData
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PaginatedResult<GetAllEmployeeVm>(pagedData, totalCount, pageNumber, pageSize);
        }

        public async Task<string> MakeEmployeeActiveAsync(string code)
        {
            var result = await _appDbContext
                .Database
                .ExecuteSqlRawAsync("Exec dbo.SP_MakeEmployeeActive @Code={0}", code);
            return result > 0 ? "Employee is Activated Successfully" : "Failed to activate Employee";
        }

        public async Task<string> MakeEmployeeInactiveAsync(string code)
        {
            var result = await _appDbContext
                 .Database
                 .ExecuteSqlRawAsync("EXEC dbo.SP_MakeEmployeeInactive @Code = {0}", code);

            return result > 0 ? "Employee is inactive successfully" : "Failed to inactivate employee";
        }
        public async Task<GetEmployeeProfileQueryVm> GetEmployeeProfileAsync(string code)
        {
            var employeeProfile = _appDbContext
        .Set<GetEmployeeProfileQueryVm>()
        .FromSqlRaw("EXEC GetEmployeeProfile @Code = {0}", code)
        .AsNoTracking()
        .AsEnumerable()
        .FirstOrDefault();

            return await Task.FromResult(employeeProfile);
        }


        public async Task<Employee> AddEmployee(CreateEmployeeMasterDto employee)
        {
            Console.WriteLine(employee.Image);

            byte[] imageBytes = employee.Image != null ? Convert.FromBase64String(employee.Image) : null;
            byte[] signatureBytes = employee.Signature != null ? Convert.FromBase64String(employee.Signature) : null;

            var parameters = new List<SqlParameter>
{   new SqlParameter("@Name", employee.Name ?? (object)DBNull.Value),
    new SqlParameter("@Code", employee.Code ?? (object)DBNull.Value),

    new SqlParameter("@Address", employee.Address ?? (object)DBNull.Value),
    new SqlParameter("@MobileNo", employee.MobileNo ?? (object)DBNull.Value),
    new SqlParameter("@SkypeId", employee.SkypeId ?? (object)DBNull.Value),
    new SqlParameter("@JoinDate", (object?)employee.JoinDate ?? DBNull.Value),
    new SqlParameter("@Email", employee.Email ?? (object)DBNull.Value),
    new SqlParameter("@BccEmail", employee.BccEmail ?? (object)DBNull.Value),
    new SqlParameter("@PanNumber", employee.PanNumber ?? (object)DBNull.Value),
    new SqlParameter("@BirthDate", (object?)employee.BirthDate ?? DBNull.Value),


    new SqlParameter("@Image", SqlDbType.VarBinary) { Value = (object?)imageBytes ?? DBNull.Value },
    new SqlParameter("@Signature", SqlDbType.VarBinary) { Value = (object?)signatureBytes ?? DBNull.Value },

    new SqlParameter("@LoginStatus", employee.LoginStatus),
    new SqlParameter("@LeftCompany", (object?)employee.LeftCompany ?? DBNull.Value),
    new SqlParameter("@leftDate", (object?)employee.LeaveCompany ?? DBNull.Value),

    new SqlParameter("@Fk_LocationId", (object?)employee.LocationId ?? DBNull.Value),
    new SqlParameter("@Fk_DesignationId", (object?)employee.DesignationId ?? DBNull.Value),
    new SqlParameter("@Fk_ShiftId", (object?)employee.ShiftId ?? DBNull.Value),
    new SqlParameter("@Fk_EmployeeTypeId", (object?)employee.EmployeeTypeId ?? DBNull.Value),
    new SqlParameter("@Fk_UserGroupId", (object?)employee.UserGroupId ?? DBNull.Value),
    new SqlParameter("@Fk_BranchId", (object?)employee.BranchId ?? DBNull.Value),
    new SqlParameter("@Fk_DivisionId", (object?)employee.DivisionId ?? DBNull.Value),
};


            await _appDbContext.Database.ExecuteSqlRawAsync(
                @"EXEC SP_Employee_insert 
            @Name,
            @Code, 
            
            @Address, 
            @MobileNo, 
            @SkypeId, 
            @JoinDate, 
            @Email, 
            @BccEmail, 
            @PanNumber, 
            @BirthDate,
            @Image, 
            @Signature, 
            @LoginStatus, 
            @LeftCompany, 
            @leftDate, 
            @Fk_LocationId, 
            @Fk_DesignationId, 
            @Fk_ShiftId, 
            @Fk_EmployeeTypeId, 
            @Fk_UserGroupId,
            @Fk_BranchId,
            @Fk_DivisionId",
                parameters.ToArray()
            );

            return new Employee
            {
                Name = employee.Name,
                Code = employee.Code,
                Address = employee.Address,
                MobileNo = employee.MobileNo,
                SkypeId = employee.SkypeId,
                JoinDate = employee.JoinDate,
                Email = employee.Email,
                BccEmail = employee.BccEmail,
                PanNumber = employee.PanNumber,
                BirthDate = employee.BirthDate,
                Image = imageBytes,
                Signature = signatureBytes,
                LoginStatus = employee.LoginStatus,
                LeftCompany = employee.LeftCompany,
                LeaveCompany = employee.LeaveCompany,
                LocationId = employee.LocationId,
                DesignationId = employee.DesignationId,
                ShiftId = employee.ShiftId,
                EmployeeTypeId = employee.EmployeeTypeId,
                UserGroupId = employee.UserGroupId,
                BranchId = employee.BranchId,
                DivisionId = employee.DivisionId
            };
        }
    }



}










