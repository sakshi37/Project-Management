using HR.Application.Features.Locations.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.UpdateLoation
{
    public record UpdateLocationCommand(UpdateLocationDto Locaton) : IRequest<LocationDto>;

}
