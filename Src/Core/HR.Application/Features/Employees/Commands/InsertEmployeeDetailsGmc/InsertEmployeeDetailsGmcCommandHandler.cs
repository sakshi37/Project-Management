using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.InsertEmployeeDetailsGmc
{
    public class InsertEmployeeDetailsGmcCommandHandler : IRequestHandler<InsertEmployeeDetailsGmcCommand, bool>
    {
        private readonly IEmployeeMasterRepository _repository;

        public InsertEmployeeDetailsGmcCommandHandler(IEmployeeMasterRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(InsertEmployeeDetailsGmcCommand command, CancellationToken cancellationToken)
        {

            var dto = command.Dto;
            int fkGenderId = dto.Fk_GenderId;


            var exists = await _repository.EmployeeExistsAsync(dto.Code);
            if (!exists)
            {
                throw new System.Exception("Employee not found.");
            }

            
            return await _repository.InsertEmployeeDetailsGmcAsync(dto);
        }
    }
}
