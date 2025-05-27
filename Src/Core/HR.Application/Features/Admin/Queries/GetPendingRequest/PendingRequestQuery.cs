using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Queries.GetPendingRequest
{
    public record PendingRequestQuery : IRequest<List<PendingRequestVm>>;
    
}
