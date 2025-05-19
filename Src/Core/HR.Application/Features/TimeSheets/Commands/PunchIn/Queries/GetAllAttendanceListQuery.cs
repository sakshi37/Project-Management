using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn.Queries
{
    public record GetAllAttendanceListQuery : IRequest<IEnumerable<GetAllAttendanceDto>>
    {
    }
}
