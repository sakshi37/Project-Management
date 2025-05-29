using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.ProjectMaster.Command;
using HR.Application.Features.ProjectMaster.Query;
using HR.Application.Features.ProjectMaster.Stack.Query.GetAllStack;
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
        public async Task<List<GetAllProjectDto>> GetAllProjects(int teamLeaderId)
        {
            return await _context.GetAllProjects.FromSqlRaw("EXEC SP_GetAllProjects @TeamLeaderId = {0}", teamLeaderId).ToListAsync();
        }

        public async Task<CreateProjectDto> InsertProject(CreateProjectDto insertDto)

        {
            string commaSeparatedStackIds = string.Join(",", insertDto.StackIds);
            string sql = "EXEC SP_ProjectInsert @Name={0}, @Fk_StackIds={1}, @Fk_TeamLeaderId = {2}";
            await _context.Database.ExecuteSqlRawAsync(sql, insertDto.Name, commaSeparatedStackIds, insertDto.Fk_TeamLeaderId);

            return new CreateProjectDto
            {
                Name = insertDto.Name,
                StackIds = insertDto.StackIds,
            };
        }
        public async Task<List<GetAllStackDto>> GetAllStack()
        {
            return await _context.GetAllStackDtos.FromSqlRaw("EXEC SP_StackGetAll").ToListAsync();
        }


    }
}
