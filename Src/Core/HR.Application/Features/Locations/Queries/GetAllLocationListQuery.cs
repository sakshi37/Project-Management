using MediatR;

namespace HR.Application.Features.Location.Query
{
    public record GetAllLocationListQuery : IRequest<IEnumerable<GetAllLocationDto>>
    {


    }
}
