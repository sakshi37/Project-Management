namespace HR.Application.Features.Employee.Dtos
{
    public class EmployeeDto
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string? Address { get; set; }
        public string? MobileNo { get; set; }

        public string? SkypeId { get; set; }
        public string? Email { get; set; }
        public DateTime? JoinDate { get; set; }
        public string? BccEmail { get; set; }
        public string? PanNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public byte[]? Image { get; set; }

        public byte[]? Signature { get; set; }
        public bool? LoginStatus { get; set; }

        public bool? LeftCompany { get; set; }
        public DateTime? LeftDate { get; set; }
        public int LocationId { get; set; }
        public int DesignationId { get; set; }
        public int ShiftId { get; set; }
        public int EmployeeTypeId { get; set; }
        public int UsergroupId { get; set; }
        public string Password { get; set; }
    }
}
