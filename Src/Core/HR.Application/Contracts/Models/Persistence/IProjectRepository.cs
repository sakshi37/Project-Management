using HR.Application.Features.ProjectMaster.Command;
using HR.Application.Features.ProjectMaster.Query;
using HR.Application.Features.ProjectMaster.Stack.Query.GetAllStack;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IProjectRepository
    {
        public Task<List<GetAllProjectDto>> GetAllProjects();

        public Task<CreateProjectDto> InsertProject(CreateProjectDto project);

        public Task<List<GetAllStackDto>> GetAllStack();
    }
}
