using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.ParticularEmployeeDtos;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class EmployeeAttendanceReportRepository : IEmployeeAttendanceReportRepository
    {
        private readonly AppDbContext _appDbContext;

        public EmployeeAttendanceReportRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        #region Get All Attendance Reports

        /// <summary>
        /// Retrieves all employee attendance reports.
        /// Executes stored procedure: GetAllAttendanceReport
        /// </summary>
        public async Task<List<EmployeeAttendanceReportDto>> GetAllAsync()
        {
            return await _appDbContext.attendanceRepoertdtos
                .FromSqlRaw("EXEC [dbo].[GetAllAttendanceReport]")
                .ToListAsync();
        }

        #endregion

        #region Get Attendance Reports By Division Name

        /// <summary>
        /// Retrieves attendance reports filtered by division name.
        /// Executes stored procedure: GetAttendanceReportByDivisionName
        /// </summary>
        public async Task<List<EmployeeAttendanceReportDto>> GetAllDivisionName(string divisionName)
        {
            return await _appDbContext.attendanceRepoertdtos
                .FromSqlRaw("EXEC [dbo].[GetAttendanceReportByDivisionName] @DivisionName = {0}", divisionName)
                .ToListAsync();
        }

        #endregion

        #region Get Attendance Reports By Employee Name

        /// <summary>
        /// Retrieves attendance reports filtered by employee name.
        /// Executes stored procedure: GetAttendanceReportByEmployeeName
        /// </summary>
        public async Task<List<EmployeeAttendanceReportDto>> GetAllEmployeeName(string employeeName)
        {
            return await _appDbContext.attendanceRepoertdtos
                .FromSqlRaw("EXEC [dbo].[GetAttendanceReportByEmployeeName] @EmployeeName = {0}", employeeName)
                .ToListAsync();
        }

        #endregion

        #region Get Attendance Reports By Team Lead ID

        /// <summary>
        /// Retrieves attendance reports filtered by team lead ID.
        /// Executes stored procedure: GetAttendanceReportByTLName
        /// </summary>
        public async Task<List<EmployeeAttendanceReportDto>> GetAllTL(int employeeId)
        {
            return await _appDbContext.attendanceRepoertdtos
                .FromSqlRaw("EXEC [dbo].[GetAttendanceReportByTLName] @TLId = {0}", employeeId)
                .ToListAsync();
        }

        #endregion

        #region Get Particular Employee Details

        /// <summary>
        /// Retrieves details of all particular employees.
        /// Executes stored procedure: GetParticularEmployee
        /// </summary>
        public async Task<List<ParticularEmployeeDto>> GetEmployee()
        {
            return await _appDbContext.ParticularEmployee
                .FromSqlRaw("EXEC [dbo].[GetParticularEmployee]")
                .ToListAsync();
        }

        #endregion
    }
}
