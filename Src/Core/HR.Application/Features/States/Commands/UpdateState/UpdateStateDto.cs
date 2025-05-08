using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.States.Commands.UpdateState
{
    public class UpdateStateDto
    {
        public int StateId { get; set; }
        public int CountryId { get; set; }
        public string StateName { get; set; }
        public string StateCode { get; set; }
        public bool StateStatus { get; set; }
        public int UpdatedBy { get; set; }
    }

}
