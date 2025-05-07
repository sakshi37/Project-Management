using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.CreateLocation
{
    public class CreateLocationDto
    {
        public string LocationName { get; set; }
        public bool LocationStatus { get; set; }
        public int CityId { get; set; }
        //public string PrefixName { get; set; }
        public int CreatedBy { get; set; }
    }
}
