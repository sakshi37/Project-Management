using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.TeamCompositions.Commands.UpdateTeamComposition
{
    public class UpdateTeamCompositionDto
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public int Fk_BranchId { get; set; }
        public int Fk_DivisionId { get; set; }
        public int Fk_TeamLeaderId { get; set; }
        public bool TeamStatus { get; set; }
        public List<int> TeamMembers { get; set; } = new();

        public int UpdatedBy { get; set; }
    }

}
