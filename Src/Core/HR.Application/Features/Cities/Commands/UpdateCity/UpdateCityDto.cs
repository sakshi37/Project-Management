using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Cities.Commands.UpdateCity
{
    public class UpdateCityDto
    {
        public int CityId { get; set; }
        public int StateId { get; set; }
        public string CityName { get; set; }
        public bool CityStatus { get; set; }
        public int UpdatedBy { get; set; }
    }
}
