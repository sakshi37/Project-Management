using MediatR;

namespace HR.Application.Features.Employee.Commands.Query
{
    public record GetAllEmployeeQuery : IRequest<IEnumerable<GetEmployeeVm>>
    {
    }
}
