using HR.Application.Features.Employees.Commands.UpdateEmployee;
using System;
using System.ComponentModel.DataAnnotations;

namespace HR.Application.Features.Employees.Commands.InsertEmployeeDetailsGmc
{
    public class InsertEmployeeDetailsGmcCommandDto
    {
        public string Code { get; set; }

        public string Address { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{5}[0-9]{4}[A-Z]{1}$", ErrorMessage = "PAN number must be 5 capital letters, 4 digits, followed by 1 capital letter (e.g., ABCDE1234F).")]
        public string PanNumber { get; set; }

        [Required]
        [RegularExpression(@"^\d{12}$", ErrorMessage = "Aadhar card number must be exactly 12 digits.")]
        public string AadharCardNo { get; set; }

        [DataType(DataType.Date)]
        [CustomValidation(typeof(InsertEmployeeDetailsGmcCommandDto), nameof(ValidateDateNotInFuture))]
        public DateTime? BirthDate { get; set; }

        [DataType(DataType.Date)]
        [CustomValidation(typeof(InsertEmployeeDetailsGmcCommandDto), nameof(ValidateDateNotInFuture))]
        public DateTime? JoinDate { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Emergency number must be 10 digits starting with 6-9.")]
        public string EmergencyNo { get; set; }

        [Range(18, 100, ErrorMessage = "Age must be between 18 and 100.")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        public int Fk_GenderId { get; set; }


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
