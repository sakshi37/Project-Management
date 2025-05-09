using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetAllEmployees
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
        public string? Address { get; set; }
        public string? MobileNo { get; set; }
        public string? SkypeId { get; set; }
        public DateTime? JoinDate { get; set; }
        public string? Email { get; set; }
        public string? BccEmail { get; set; }
        public string? PanNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public byte[]? Signature { get; set; }
        public bool? LeftCompany { get; set; }
        public DateTime? LeftDate { get; set; }
    }
}


//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace HR.Application.Features.Employees.Queries.GetAllEmployees
//{
//    public class GetAllEmployeeVm
//    {
//        public byte[]? Image { get; set; }           // Maps to Photo
//        public string? Name { get; set; }            // Maps to EmployeeName
//        public string? Code { get; set; }            // Maps to EmployeeCode
//        public string? Address { get; set; }
//        public string? MobileNo { get; set; }
//        public string? SkypeId { get; set; }
//        public DateTime? JoinDate { get; set; }
//        public string? Email { get; set; }
//        public string? BccEmail { get; set; }
//        public string? PanNumber { get; set; }
//        public DateTime? BirthDate { get; set; }
//        public byte[]? Signature { get; set; }
//        public bool? LeftCompany { get; set; }
//        public DateTime? LeftDate { get; set; }
//        public string? DesignationName { get; set; }
//        public string? BranchName { get; set; }
//        public string? DivisionName { get; set; }
//        public string? UserGroupName { get; set; }
//        public bool? LoginStatus { get; set; }
//        public string? Action { get; set; }
//    }

//}
