using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetSessionByEmp
{
    public record GetSessionByEmpQuery(int EmpId) : IRequest<Attendance>
    {
    }
}
