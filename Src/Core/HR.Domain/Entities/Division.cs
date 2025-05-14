using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class division
    {
        public int DivisionId { get; set; }
        public string? DivisionName { get; set; }
        public int ProjectManagerId { get; set; }
        public string? ProjectManagerName { get; set; }
        public string? PrefixName { get; set; }
        public int Fk_HolidayId { get; set; }  
        public double ManHours { get; set; }
        public bool DivisionStatus { get; set; }
        public string? CreatedBy { get; set; }
        public bool HolidayListType { get; set; }

        //public DateTime CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        //public DateTime UpdatedDate { get; set; }
    }
}
