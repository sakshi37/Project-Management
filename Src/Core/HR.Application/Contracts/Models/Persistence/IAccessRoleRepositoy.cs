using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.AccesRole.Command.CreateAccessRole;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IAccessRoleRepositoy
    {
        Task<List<AccessRole>> GetAllAsync();
        Task<bool> CreateAccesRole(CreateAcessRoleCommandDto dto);
    }
}
