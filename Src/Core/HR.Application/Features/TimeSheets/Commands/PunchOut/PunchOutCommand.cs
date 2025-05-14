using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchOut
{
    public record PunchOutCommand(int EmpId) : IRequest
    {
    }
}
