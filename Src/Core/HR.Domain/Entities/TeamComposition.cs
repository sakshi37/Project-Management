using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class TeamComposition
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public int Fk_BranchId { get; set; }
        public int Fk_DivisionId { get; set; }
        public int Fk_TeamLeaderId { get; set; }
        public bool TeamStatus { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

}
