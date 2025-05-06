using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employee.Queries.GetAllEmployees
{
   public  class GetAllEmployeeVm
    {
        public byte[]? Image { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? DesignationName { get; set; }
        public string? BranchName { get; set; }
        public string? DivisionName { get; set; }
        public string? UserGroupName { get; set; }
        public Boolean? LoginStatus { get; set; }
        public string? Action { get; set; }
    }
}
