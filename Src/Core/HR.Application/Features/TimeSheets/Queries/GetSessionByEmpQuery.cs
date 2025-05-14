using MediatR;

namespace HR.Application.Features.TimeSheets.Queries
{
    public record GetSessionByEmpQuery(int EmpId) : IRequest
    {
    }
}
