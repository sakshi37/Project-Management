using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetByIdTimeSheet
{
    public record GetByIdTimeSheetQuery(int empId) : IRequest<GetByIdTimeSheetDto>
    {
    }
}
