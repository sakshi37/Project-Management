using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Cities.Commands.Dtos
{
    public class CityDto
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CountryId { get; set; } 

        public string CountryName { get; set; }
        public bool CityStatus { get; set; }
    }
}
