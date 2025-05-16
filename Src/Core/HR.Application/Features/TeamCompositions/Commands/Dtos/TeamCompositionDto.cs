using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.TeamCompositions.Commands.Dtos
{
    public class TeamCompositionDto
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public int Fk_BranchId { get; set; }
        public string BranchName { get; set; }
        public int Fk_DivisionId { get; set; }
        public string DivisionName { get; set; }
        public int Fk_TeamLeaderId { get; set; }
        public string TeamLeaderName { get; set; }
        public bool TeamStatus { get; set; }
    }

}
