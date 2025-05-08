using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Cities.Commands.CreateCity
{
    public class CreateCityDto
    {
        public int StateId { get; set; }
        public string CityName { get; set; }
        public int CreatedBy { get; set; }
    }
}
