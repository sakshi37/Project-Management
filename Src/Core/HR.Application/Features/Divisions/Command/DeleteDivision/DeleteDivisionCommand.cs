using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.DeleteDivision
{
    public record DeleteDivisionCommand(int DivisionId, int UpdatedBy):IRequest<bool>;
    
    
}
