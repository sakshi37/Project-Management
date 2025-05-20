using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetAllTimeSheet
{
    public record GetAllTimeSheetListQuery : IRequest<IEnumerable<GetAllTimeSheetListDto>>
    {

    }
}
