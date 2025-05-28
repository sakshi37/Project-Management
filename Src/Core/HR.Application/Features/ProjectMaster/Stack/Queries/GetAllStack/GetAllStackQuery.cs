using HR.Application.Features.ProjectMaster.Stack.Query.GetAllStack;
using MediatR;

namespace HR.Application.Features.ProjectMaster.Stack.Queries.GetAllStack
{
    public record GetAllStackQuery : IRequest<List<GetAllStackDto>>
    {
    }
}
