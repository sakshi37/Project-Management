using HR.Application.Features.Employee.Commands.Query;
using MediatR;

namespace HR.Application.Features.Employees.Queries
{
    public record GetEmployeeByEmailQuery : IRequest<GetEmployeeVm>
    {
    }
}
