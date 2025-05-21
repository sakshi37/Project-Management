using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class EmployeeAttendanceReport
    {
        public string? EmployeeCode { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime InTime { get; set; }
        public DateTime OutTime { get; set; }
        public string? DivisionName { get; set; }
        public string? DepartmentName { get; set; }
        public DateTime Duration { get; set; }
        public string Status { get; set; }

        //public  string? DesignationName { get; set; }



    }
}
