using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.States.Commands.CreateState
{
    public class CreateStateDto
    {
        public int CountryId { get; set; }
        public string StateName { get; set; }
        public string StateCode { get; set; }
        public int CreatedBy { get; set; }
    }

}
