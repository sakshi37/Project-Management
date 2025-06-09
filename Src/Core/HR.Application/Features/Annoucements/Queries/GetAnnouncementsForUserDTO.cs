using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Annoucements.Queries
{
    public class GetAnnouncementsForUserDTO
    {
        public string EmployeeCode { get; set; } = string.Empty;
        public string UserGroup { get; set; } = string.Empty;
    }


}
