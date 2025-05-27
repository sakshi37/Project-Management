using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.InsertEmployeeDetailsGmc
{
    public class InsertEmployeeDetailsGmcCommandDto
    {
        public string Code { get; set; }
        public string Address { get; set; }
        public string PanNumber { get; set; }
        public string AadharCardNo { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string EmergencyNo { get; set; }
        public int Age{    get; set; }
        public int Fk_GenderId { get; set; } // Add Fk_GenderId here
}
}
