using MediatR;

namespace HR.Application.Features.Employees.Queries.GetAllEmployeesByIdName
{
    public record GetAllEmployeesByIdNameQuery : IRequest<List<GetAllEmployeeByIdNameDto>>
    {
    }
}
