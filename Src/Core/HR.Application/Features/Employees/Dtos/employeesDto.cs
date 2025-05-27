using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Dtos
{
    public class employeesDto
    {
        public string? Code { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? UserGroupName { get; set; }
        public bool? FirstLogin { get; set; }
        public bool? LoginStatus { get; set; }
    }

}
