using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class TeamMember
    {
        public int Id { get; set; }
        public int Fk_TeamId { get; set; }
        public int Fk_EmployeeId { get; set; }

        public TeamComposition Team { get; set; }
    }

}
