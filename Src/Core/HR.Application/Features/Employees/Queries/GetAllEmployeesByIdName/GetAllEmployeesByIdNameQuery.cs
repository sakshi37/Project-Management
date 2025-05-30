using MediatR;

namespace HR.Application.Features.Employees.Queries.GetAllEmployeesByIdName
{
    public record GetAllEmployeesByIdNameQuery(int teamLeadId) : IRequest<List<GetAllEmployeeByIdNameDto>>
    {
    }
}
