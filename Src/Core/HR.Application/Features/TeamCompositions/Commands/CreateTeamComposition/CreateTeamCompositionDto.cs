using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition
{
    public class CreateTeamCompositionDto
    {
        public string TeamName { get; set; }
        public int Fk_BranchId { get; set; }
        public int Fk_DivisionId { get; set; }
        public int Fk_TeamLeaderId { get; set; }
        public int CreatedBy { get; set; }
        public List<int> TeamMembers { get; set; }

    }


}
