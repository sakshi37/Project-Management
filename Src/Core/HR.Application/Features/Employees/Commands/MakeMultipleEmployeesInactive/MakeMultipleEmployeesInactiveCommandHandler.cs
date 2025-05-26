using HR.Application.Contracts.Persistence;
using HR.Application.Features.Employees.Commands.MakeEmployeeInactivate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.MakeMultipleEmployeesInactive
{
    public class MakeMultipleEmployeesInactiveCommandHandler : IRequestHandler<MakeMultipleEmployeesInactiveCommannd, string>
    {
        private readonly IEmployeeMasterRepository _repo;

        public MakeMultipleEmployeesInactiveCommandHandler(IEmployeeMasterRepository repo)
        {
            _repo = repo;
        }


        public async Task<string> Handle(MakeMultipleEmployeesInactiveCommannd request, CancellationToken cancellationToken)
        {
            string codes = string.Join(",", request.EmployeeCodes);
            return await _repo.MakeMultipleEmployeesInactiveAsync(codes);
        }
    }

}
