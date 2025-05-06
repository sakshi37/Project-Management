using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Designations.Commands.CreateDesignation
{
    public class CreateDesignationDto
    {
        public string DesignationName { get; set; }
        public int CreatedBy { get; set; }
    }
}
