using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using HR.Application.Features.UserGroup.Queries.GetAllUserGroup;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class UserGroupRepository:IUserGroupRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserGroupRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<GetAllUserGroupQueryVm>> GetAllAsync()
        {
            return await _appDbContext.GetAllUserGroupQueryVms.FromSqlRaw("EXEC SP_GetAllUserGroup").ToListAsync();
        }
    }
}