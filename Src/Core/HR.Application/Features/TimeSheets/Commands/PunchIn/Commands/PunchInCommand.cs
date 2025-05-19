using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn.Commands
{
    public record PunchInCommand(int EmpId) : IRequest
    {
    }
}
