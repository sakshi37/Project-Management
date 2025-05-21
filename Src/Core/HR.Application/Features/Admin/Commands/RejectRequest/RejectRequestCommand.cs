using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.RejectRequest
{
    public record RejectRequestCommand(int RequestId, string EmpCode) : IRequest<string>;

}
