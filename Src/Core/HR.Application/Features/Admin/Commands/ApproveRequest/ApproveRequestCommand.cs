using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.ApproveRequest
{
    public record ApproveRequestCommand    (int RequestId, string EmpCode, string Comment) : IRequest<string>;

}
