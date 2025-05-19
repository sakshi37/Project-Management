using HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos;
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
    }
}
