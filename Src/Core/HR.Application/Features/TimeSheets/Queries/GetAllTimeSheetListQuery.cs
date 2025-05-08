using HR.Application.Features.TimeSheet.Queries;
using MediatR;

namespace HR.Application.Features.TimeSheet.Query
{
    public record GetAllTimeSheetListQuery : IRequest<IEnumerable<GetAllTimeSheetListDto>>
    {

    }
}
