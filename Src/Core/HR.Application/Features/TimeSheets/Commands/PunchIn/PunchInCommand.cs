using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn
{
    public record PunchInCommand(int EmpId) : IRequest
    {
    }
}
