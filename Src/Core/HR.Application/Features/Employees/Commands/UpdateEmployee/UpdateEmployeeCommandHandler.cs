using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            try
            {
                var result = await _employeeRepository.UpdateEmployeeAsync(request.Dto);
                Console.WriteLine($"[DEBUG] Repository returned: {result}");
                return result;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"[ERROR] Exception in handler: {ex.Message}");
                return false;
            }
        }

    }
}
