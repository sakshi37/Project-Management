using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetByIdTimeSheet
{
    public record GetByIdTimeSheetQuery(string code) : IRequest<List<GetByIdTimeSheetDto>>
    {
    }
}
