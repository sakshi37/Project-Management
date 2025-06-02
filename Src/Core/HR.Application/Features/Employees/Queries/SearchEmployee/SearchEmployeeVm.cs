using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.SearchEmployee
{
    public class SearchEmployeeVm
    {
        public string? Code { get; set; }
        public string? Name { get; set; }
        public bool? LoginStatus { get; set; }
        public string? BranchName { get; set; }
        public string? DesignationName { get; set; }
        public string? UserGroupName { get; set; }
        public string? DivisionName { get; set; }
    }
}
