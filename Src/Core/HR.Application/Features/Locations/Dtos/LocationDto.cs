using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Dtos
{
    public class LocationDto
    {
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public bool LocationStatus { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        
        public int CountryId { get; set; }
        public string CountryName { get; set; }


        //public bool LocationStatus { get; set; }
    }
}
