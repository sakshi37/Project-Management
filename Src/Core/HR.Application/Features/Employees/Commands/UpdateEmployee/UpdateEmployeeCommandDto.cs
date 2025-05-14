using System;

namespace HR.Application.Features.Employees.Commands.UpdateEmployee
{
    public class UpdateEmployeeCommandDto
    {
        public string Code { get; set; }

        public string? Address { get; set; }
        public string? MobileNo { get; set; }
        public string? SkypeId { get; set; }
        public string? Email { get; set; }
        public DateTime? JoinDate { get; set; }
        public string? BccEmail { get; set; }
        public string? PanNumber { get; set; }
        public string? AadharCardNo { get; set; } // ✅ Newly added
        public DateTime? BirthDate { get; set; }
        public string? Image { get; set; }
        public string? Signature { get; set; }
        public bool? LoginStatus { get; set; }
        public bool? LeftCompany { get; set; }
        public DateTime? LeaveCompany { get; set; }

        public int? CountryId { get; set; }     // ✅ Newly added
        public int? StateId { get; set; }       // ✅ Newly added
        public int? CityId { get; set; }        // ✅ Newly added
        public int? LocationId { get; set; }
        public int? DesignationId { get; set; }
        public int? ShiftId { get; set; }
        public int? EmployeeTypeId { get; set; }
        public int? UserGroupId { get; set; }
        public int? BranchId { get; set; }
        public int? DivisionId { get; set; }
        public int? GenderId { get; set; }     // ✅ Newly added
    }
}
