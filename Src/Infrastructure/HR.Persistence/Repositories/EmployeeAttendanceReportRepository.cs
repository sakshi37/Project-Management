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
        public EmployeeAttendanceReportRepository(AppDbContext appDbContext )
        {
            _appDbContext = appDbContext;   
        }
        public async Task<List<EmployeeAttendanceReportDto>> GetAllAsync()
        {
            return await _appDbContext.attendanceRepoertdtos.FromSqlRaw(" Exec [dbo].[GetAllAttendanceReport]").ToListAsync();
        }

        public async Task<List<EmployeeAttendanceReportDto>> GetAllDivisionName(string divisionName)
        {
            return await _appDbContext.attendanceRepoertdtos.FromSqlRaw("Exec [dbo].[GetAttendanceReportByDivisionName] @DivisionName={0}", divisionName).ToListAsync();
        }

        public async Task<List<EmployeeAttendanceReportDto>> GetAllEmployeeName(string employeeName)
        {
            return await _appDbContext.attendanceRepoertdtos.FromSqlRaw("Exec [dbo].[GetAttendanceReportByEmployeeName] @EmployeeName={0}", employeeName).ToListAsync();
        }

        public async Task<List<EmployeeAttendanceReportDto>> GetAllTL(int employeeId)
        {
            return await _appDbContext.attendanceRepoertdtos.FromSqlRaw("Exec [dbo].[GetAttendanceReportByTLName] @TLId={0}", employeeId).ToListAsync();
        }

        public async Task<List<ParticularEmployeeDto>> GetEmployee()
        {
            return await _appDbContext.ParticularEmployee.FromSqlRaw("Exec [dbo].[GetParticularEmployee]").ToListAsync();
        }
    }
}
