using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using HR.Application.Features.Admin.Queries.GetAllEmployee;
using HR.Application.Features.Employees.Queries.GetAllEmployeesByIdName;
using MediatR;

namespace HR.Application.Features.Admin.Queries.GetEmployeeById
{
    public class GetEmployeeByIdQueryHandler : IRequestHandler <GetEmployeeByIdQuery, List<GetEmployeeByIdDto>>
    {
        readonly IAdminRepository _repo;
        readonly IMapper _mapper;
        public GetEmployeeByIdQueryHandler(IAdminRepository repo , IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<GetEmployeeByIdDto>> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
        {

            var employee = await _repo.GetEmployeeById(request.id);
            var GetEmployeeId = _mapper.Map<List<GetEmployeeByIdDto>>(employee);
            return GetEmployeeId;
        }
    }
}
