using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.UpdateEmployee
{
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, bool>
    {
        private readonly IEmployeeMasterRepository _employeeRepository;

        public UpdateEmployeeCommandHandler(IEmployeeMasterRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

 
public async Task<bool> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        Console.WriteLine($"[DEBUG] Handling update for: {request.Dto.Code}");

        var dto = request.Dto;
        var errors = new Dictionary<string, string[]>();

        // Validation rules
        if (dto.JoinDate.HasValue && dto.JoinDate > DateTime.Today)
            errors.Add(nameof(dto.JoinDate), new[] { "Join Date cannot be in the future." });

        if (dto.BirthDate.HasValue && dto.BirthDate > DateTime.Today)
            errors.Add(nameof(dto.BirthDate), new[] { "Birth Date cannot be in the future." });

        if (dto.LeaveCompany.HasValue && dto.LeaveCompany > DateTime.Today)
            errors.Add(nameof(dto.LeaveCompany), new[] { "Leave Date cannot be in the future." });

        if (!string.IsNullOrWhiteSpace(dto.PanNumber) && dto.PanNumber.Length != 10)
            errors.Add(nameof(dto.PanNumber), new[] { "PAN Number must be exactly 10 characters." });

        if (!string.IsNullOrWhiteSpace(dto.MobileNo) && !Regex.IsMatch(dto.MobileNo, @"^\d{10}$"))
            errors.Add(nameof(dto.MobileNo), new[] { "Mobile number must be exactly 10 digits." });

        if (!string.IsNullOrWhiteSpace(dto.Email))
        {
            try
            {
                var email = new MailAddress(dto.Email); // Will throw if invalid
            }
            catch
            {
                errors.Add(nameof(dto.Email), new[] { "Invalid email format." });
            }
        }

      

        var result = await _employeeRepository.UpdateEmployeeAsync(dto);
        Console.WriteLine($"[DEBUG] Repository returned: {result}");
        return result;
    }


}
}
