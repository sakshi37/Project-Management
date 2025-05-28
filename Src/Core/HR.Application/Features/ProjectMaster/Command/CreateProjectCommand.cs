using MediatR;

namespace HR.Application.Features.ProjectMaster.Command
{
    public record CreateProjectCommand(CreateProjectDto ProjectDto) : IRequest<CreateProjectDto>
    {


    }
}
