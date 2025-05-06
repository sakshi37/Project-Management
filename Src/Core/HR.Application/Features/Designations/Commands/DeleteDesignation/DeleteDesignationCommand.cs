using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.Designations.Commands.DeleteDesignation
{
    public record DeleteDesignationCommand(int DesignationId, int UpdatedBy) : IRequest<bool>;

}
