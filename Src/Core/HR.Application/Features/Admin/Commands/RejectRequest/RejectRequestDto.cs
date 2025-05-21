using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.RejectRequest
{
    public class RejectRequestDto
    {
        public int RequestId { get; set; }
        public string EmpCode { get; set; }
    }
}
