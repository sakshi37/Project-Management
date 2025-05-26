using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.ProjectMaster.Query;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        readonly AppDbContext _context;
        public ProjectRepository(AppDbContext appDbContext)
        {

            _context = appDbContext;
        }
        public async Task<List<GetAllProjectDto>> GetAllProjects()
        {
            return await _context.GetAllProjects.FromSqlRaw("EXEC SP_GetAllProjects").ToListAsync();
        }


    }
}
