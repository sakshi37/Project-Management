using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Query.GetProjectManager
{
    public record GetAllProjectManagerQuery :IRequest<List<GetAllProjectManagerDto>>;
    
    
}
