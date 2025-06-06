using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.DeleteEmployee
{
    public class DeleteEmployeeCommandHandler:IRequestHandler<DeleteEmployeeCommand ,string>
    {
        private readonly IEmployeeMasterRepository _repo;
        private readonly IMapper _mapper;
        public DeleteEmployeeCommandHandler(IEmployeeMasterRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<string> Handle(DeleteEmployeeCommand request,CancellationToken cancellationToken)
        {
            return await _repo.DeleteEmployeeAsync(request.Code);
        }

    }
}
