using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.Dtos
{
   public class DivisionDto
    {
        public int DivisionId { get; set; }
        public int DivisionName { get; set; }
        public int ProjectManagerName { get; set; }
        public string PrefixName { get; set; }
        public float ManHours { get; set; }
        public bool DivisionStatus { get; set; }
    }
}
