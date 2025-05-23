using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HR.Application.Features.Holidays.Commands.UpdateHoliday
{
    public class UpdateHolidayDto
    {
        public int HolidayId { get; set; }
        public string HolidayName { get; set; }
        public DateTime HolidayDate { get; set; }
        public bool HolidayListType { get; set; }
        public bool HolidayStatus { get; set; }
        public IFormFile? Image { get; set; }

        public int UpdatedBy { get; set; }
    }

}
