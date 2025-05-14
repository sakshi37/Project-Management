using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Query.GetAllQuery
{
   public  class GetAllDivisionDto
    {
            public string? DivisionName { get; set; }
            public string? ProjectManagerName { get; set; }


            public string? PrefixName { get; set; }
            public bool HolidayListType { get; set; }  
            public double? ManHours { get; set; }
            public bool DivisionStatus { get; set; }

    }
}
