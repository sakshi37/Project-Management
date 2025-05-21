using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos
{
   public class EmployeeAttendanceReportDto
    {

        public string? EmployeeCode { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime? InTime { get; set; }
        public DateTime? OutTime { get; set; }
        public string? DivisionName { get; set; }
        public string? DepartmentName { get; set; }
        public DateTime Duration { get; set; }
        public string Status { get; set; }

    }
}
