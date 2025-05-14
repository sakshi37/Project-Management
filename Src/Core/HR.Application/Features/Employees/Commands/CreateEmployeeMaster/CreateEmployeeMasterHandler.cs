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
            request.newEmployee.Code = await GenerateEmpCode();
            var employee = await _employeeRepository.AddEmployee(request.newEmployee);
            await _employeeRepository.IncrCurrentEmpCounter();

            return _mapper.Map<CreateEmployeeMasterDto>(employee);
        }

        private async Task<string> GenerateEmpCode()
        {
            var currCount = await _employeeRepository.ReadCurrentEmpCounter();
            var codePrefix = "NS";
            var maxEmpDigit = 3;
            var paddedNumber = currCount.ToString().PadLeft(maxEmpDigit, '0');
            var empCode = $"{codePrefix}{paddedNumber}";

            return empCode;

        }
    }
}
