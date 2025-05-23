using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.ParticularEmployeeDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IEmployeeAttendanceReportRepository
    {
        Task<List<EmployeeAttendanceReportDto>> GetAllAsync();
        Task<List<EmployeeAttendanceReportDto>> GetAllDivisionName(string divisionName);
        Task<List<EmployeeAttendanceReportDto>> GetAllEmployeeName(string EmployeeName);
        Task<List<EmployeeAttendanceReportDto>> GetAllTL(int employeeId);
        Task<List<ParticularEmployeeDto>> GetEmployee();

    }
}
