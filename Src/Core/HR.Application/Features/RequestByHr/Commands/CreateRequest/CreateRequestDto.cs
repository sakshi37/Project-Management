using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.RequestByHr.Commands.CreateRequest
{
    public class CreateRequestDto
    {
        public string ForEmpCode { get; set; } 
        public string RequestByEmpCode { get; set; } 
        public string Reason { get; set; } 
    }

}
