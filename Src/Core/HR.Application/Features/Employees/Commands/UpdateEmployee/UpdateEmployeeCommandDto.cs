using System;
using System.ComponentModel.DataAnnotations;

namespace HR.Application.Features.Employees.Commands.UpdateEmployee
{
    public class UpdateEmployeeCommandDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string? Address { get; set; }

        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Mobile number must start with 6-9 and be 10 digits.")]
        public string? MobileNo { get; set; }

        public string? SkypeId { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }

        [EmailAddress(ErrorMessage = "Invalid BCC email address.")]
        public string? BccEmail { get; set; }

        [DataType(DataType.Date)]
        [CustomValidation(typeof(UpdateEmployeeCommandDto), nameof(ValidateDateNotInFuture))]
        public DateTime? BirthDate { get; set; }

        [DataType(DataType.Date)]
        [CustomValidation(typeof(UpdateEmployeeCommandDto), nameof(ValidateDateNotInFuture))]
        public DateTime? JoinDate { get; set; }

        [RegularExpression(@"^[A-Z]{5}[0-9]{4}[A-Z]{1}$", ErrorMessage = "Invalid PAN format (e.g., ABCDE1234F).")]
        public string? PanNumber { get; set; }

        [RegularExpression(@"^\d{12}$", ErrorMessage = "Aadhar card number must be 12 digits.")]
        public string? AadharCardNo { get; set; }

        public string? Image { get; set; }

        public string? Signature { get; set; }

        public bool? LoginStatus { get; set; }

        public bool? LeftCompany { get; set; }

        public DateTime? LeaveCompany { get; set; }

        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? CityId { get; set; }
        public int? LocationId { get; set; }
        public int? DesignationId { get; set; }
        public int? ShiftId { get; set; }
        public int? EmployeeTypeId { get; set; }
        public int? UserGroupId { get; set; }
        public int? BranchId { get; set; }
        public int? DivisionId { get; set; }
        public int? GenderId { get; set; }

        // ✨ Custom validation method for BirthDate and JoinDate
        public static ValidationResult? ValidateDateNotInFuture(DateTime? date, ValidationContext context)
        {
            if (date.HasValue && date.Value > DateTime.Now)
            {
                return new ValidationResult("Date cannot be in the future.");
            }
            return ValidationResult.Success;
        }
    }
}
