
using MediatR;

namespace HR.Application.Features.TimeSheet.Commands.UpdateTimeSheet
{
    public record UpdateTimeSheetCommand(UpdateTimeSheetDto TimeSheet) : IRequest;
}
