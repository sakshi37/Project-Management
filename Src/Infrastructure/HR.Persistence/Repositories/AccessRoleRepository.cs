using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.AccesRole.Command.CreateAccessRole;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace HR.Persistence.Repositories
{
    public class AccessRoleRepository : IAccessRoleRepositoy
    {
        readonly AppDbContext _context;
        public AccessRoleRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateAccesRole(CreateAcessRoleCommandDto dto)
        {
            var sql = "Exec [dbo].[SP_InsertAccessRole] @IsRead ={0} ,@ApproveRequest={1},  @Active ={2},@Inactive ={3},@AssignedTask ={4},@EditTask ={5},   @UpdateTask ={6} ,   @Announcment ={7},  @AddEmployee ={8},@EditEmployee ={9}, @Fk_UserGroupId ={10}";
            int addAccessRole = await _context.Database.ExecuteSqlRawAsync(sql, dto.IsRead, dto.ApproveRequest, dto.Active, dto.Inactive, dto.AssignedTask, dto.EditTask, dto.UpdateTask, dto.Announcment, dto.AddEmployee, dto.EditEmployee, dto.Fk_UserGroupId);
            // var accessRole = new CreateAcessRoleCommandDto
            //{

            //    IsRead = dto.IsRead,
            //    ApproveRequest = dto.ApproveRequest,
            //    Active = dto.Active,
            //    Inactive = dto.Inactive,
            //    AssignedTask = dto.AssignedTask,
            //    EditTask = dto.EditTask,
            //    UpdateTask = dto.UpdateTask,
            //    Announcment = dto.Announcment,
            //    AddEmployee = dto.AddEmployee,
            //    EditEmployee = dto.EditEmployee,
            //    Fk_UserGroupId = dto.Fk_UserGroupId
            //};

            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<List<AccessRole>> GetAllAsync()
        {
            return await _context.accessRole.FromSqlRaw("Exec dbo.SP_GetAllAccessRole").ToListAsync();
        }
    }
}
