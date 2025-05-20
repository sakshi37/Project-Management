using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.Employees.Queries.GetAllEmployeesByIdName
{
    public class GetAllEmployeesByIdNameHandler : IRequestHandler<GetAllEmployeesByIdNameQuery, List<GetAllEmployeeByIdNameDto>>
    {
        readonly IEmployeeMasterRepository _employeeMasterRepository;
        readonly IMapper _mapper;
        public GetAllEmployeesByIdNameHandler(IEmployeeMasterRepository employee, IMapper mapper)
        {

            _employeeMasterRepository = employee;
            _mapper = mapper;

        }

        public async Task<List<GetAllEmployeeByIdNameDto>> Handle(GetAllEmployeesByIdNameQuery request, CancellationToken cancellationToken)
        {
            var employee = await _employeeMasterRepository.GetAllEmployeeByIdName();
            var getAllEmployeeWithIdName = _mapper.Map<List<GetAllEmployeeByIdNameDto>>(employee);
            return getAllEmployeeWithIdName;
        }
    }
}
