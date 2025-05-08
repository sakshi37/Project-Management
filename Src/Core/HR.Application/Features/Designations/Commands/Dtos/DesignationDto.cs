using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Designations.Commands.Dtos
{
    public class DesignationDto
    {
        public int DesignationId { get; set; }
        public string DesignationName { get; set; }
        public bool DesignationStatus { get; set; }
    }
}
