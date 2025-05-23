using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.ApproveRequest
{
    public class ApproveRequestDto
    {
        public int RequestId { get; set; }
        public string EmpCode { get; set; }
        public string Comment { get; set; }
    }
}
