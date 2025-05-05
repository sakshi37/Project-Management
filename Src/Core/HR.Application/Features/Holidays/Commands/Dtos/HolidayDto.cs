using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Holidays.Commands.Dtos
{
    
    public class HolidayDto
    {
        public int HolidayId { get; set; }
        public string HolidayName { get; set; }
        public DateTime HolidayDate { get; set; }
        public bool HolidayListType { get; set; }
        public bool HolidayStatus { get; set; }
    }

}
