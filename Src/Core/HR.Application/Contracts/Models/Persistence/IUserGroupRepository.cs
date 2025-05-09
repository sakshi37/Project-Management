using HR.Application.Features.UserGroup.Queries.GetAllUserGroup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IUserGroupRepository
    {
        Task<List<GetAllUserGroupQueryVm>>  GetAllAsync();
    }
}

