using MediatR;

namespace HR.Application.Features.ProjectMaster.Query
{
    public record GetAllProjectQuery : IRequest<List<ProjectOutputDto>>
    {
    }
}
