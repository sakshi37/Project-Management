using MediatR;

namespace HR.Application.Features.TimeSheet.Commands.CreateTimeSheet
{
    public record CreateTimeSheetCommand(CreateTimeSheetDto TimeSheet) : IRequest<CreateTimeSheetDto>;

}
