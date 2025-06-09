using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.UpdateUserRole
{
    public class UpdateUserRoleDTO
    {
        public string Code { get; set; }
        public int Fk_UserGroupId { get; set; }

    }
}
