using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Commands.CreateBranch
{
    public class CreateBranchDto
    {
        public string BranchName { get; set; }
        public int CreatedBy { get; set; }
        public int Fk_CityId { get; set; }

    }
}
