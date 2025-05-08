using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class Branch
    {
        public int BranchId { get; set; }
        public int Fk_CityId { get; set; }
        public string BranchName { get; set; }
        public bool BranchStatus { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
