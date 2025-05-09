using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.CreateLocationCommand
{
    public class CreateDivisionDto
    {
        public string DivisionName { get; set; }
        public string ProjectManagerName { get; set; }

        public string PrefixName { get; set; }
        public int Fk_HolidayId { get; set; }
        public float ManHours { get; set; }
        public bool DivisionStatus { get; set; }
        public int CreatedBy { get; set; }
        //public DateTime CreatedDate { get; set; } = DateTime.Now;

    }
}
