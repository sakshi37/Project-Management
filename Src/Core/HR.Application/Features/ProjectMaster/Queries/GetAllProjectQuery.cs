using MediatR;

namespace HR.Application.Features.ProjectMaster.Query
{
    public record GetAllProjectQuery(int id) : IRequest<List<ProjectOutputDto>>
    {
    }
}
