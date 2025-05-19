using HR.Application.Contracts.Models.Persistence;
using HR.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Deparment.Querries.GetAllDepartment
{
   public  class GetAllDepartmentQueryHandler:IRequestHandler<GetAllDepartmentQuery ,List<Department>>
    {
        private readonly IDepartmentRepository _repository;
        public GetAllDepartmentQueryHandler(IDepartmentRepository repository)
        {
         _repository = repository;   
        }

        public  async Task<List<Department>> Handle(GetAllDepartmentQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAllAsync();
        }
    }
}
