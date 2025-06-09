using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetEmployeeBasicDetails
{
   public class GetEmployeeBasicDetailsByCodeQueryVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Address {  get; set; }
        public string? DesignationName { get; set; }
        public string? GenderType {  get; set; }
        public string? PanNumber { get; set; }
        public DateTime? JoinDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Email { get; set; }
        public string? AadharCardNo {  get; set; }


    }
}

