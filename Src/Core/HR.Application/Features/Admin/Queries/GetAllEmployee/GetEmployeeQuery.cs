using MediatR;

namespace HR.Application.Features.Admin.Queries.GetAllEmployee
{
    public record class GetEmployeeQuery : IRequest<List<GetEmployeeDto>>
    {
    }
}
