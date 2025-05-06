using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.Employee.Commands.CreateEmployeeMaster
{
    public class CreateEmployeeMasterHandler : IRequestHandler<CreateEmployeeCommand, CreateEmployeeMasterDto>
    {
        readonly IMapper _mapper;
        readonly IEmployeeMasterRepository _employeeRepository;
        public CreateEmployeeMasterHandler(IMapper mapper, IEmployeeMasterRepository iEmployeeMasterRepository)
        {

            _employeeRepository = iEmployeeMasterRepository;
            _mapper = mapper;
        }


        public async Task<CreateEmployeeMasterDto> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {

            var employee = await _employeeRepository.AddEmployee(request.newEmployee);


            return _mapper.Map<CreateEmployeeMasterDto>(employee);
        }
    }
}
