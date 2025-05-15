using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.UpdateLoation
{
    public class UpdateLocationDto
    {
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int CityId { get; set; }
        public bool LocationStatus { get; set; }
        public string UpdatedBy { get; set; }
    }
}
