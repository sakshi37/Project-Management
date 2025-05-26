using HR.Application.Features.ProjectMaster.Query;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IProjectRepository
    {
        public Task<List<GetAllProjectDto>> GetAllProjects();
    }
}
