using MediatR;

namespace HR.Application.Features.Employee.Commands.CreateEmployeeMaster
{
    public record CreateEmployeeCommand(CreateEmployeeMasterDto newEmployee) : IRequest<CreateEmployeeMasterDto>
    {
    }
}
