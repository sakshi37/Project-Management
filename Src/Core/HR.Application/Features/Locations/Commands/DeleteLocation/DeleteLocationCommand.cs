using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.DeleteLocation
{
    public record DeleteLocationCommand(int LocationId,int UpdatedBy): IRequest<bool>;
    
}
