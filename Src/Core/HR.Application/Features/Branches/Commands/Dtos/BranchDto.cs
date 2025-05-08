using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Commands.Dtos
{
    public class BranchDto
    {
      
        public string BranchName { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string StateName { get; set; }
        public bool BranchStatus { get; set; }
    }
}

