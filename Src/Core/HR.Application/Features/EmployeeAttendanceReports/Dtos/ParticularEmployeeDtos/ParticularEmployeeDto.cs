using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Dtos.ParticularEmployeeDtos
{
    public class ParticularEmployeeDto
    {
        public int? EmployeeId { get; set; }
        public string? EmployeeCode { get; set; }
        public string? EmployeeName { get; set; }
    }
}
