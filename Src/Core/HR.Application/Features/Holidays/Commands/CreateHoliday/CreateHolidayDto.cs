using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HR.Application.Features.Holidays.Commands.CreateHoliday
{
    public class CreateHolidayDto
    {
        public string HolidayName { get; set; }
        public DateTime HolidayDate { get; set; }
        public bool HolidayListType { get; set; }
        public IFormFile? Image { get; set; }

        public int CreatedBy { get; set; }
    }

}
