using HR.Application.Features.Dtos;
using MediatR;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.CreateLocation
{
    public record CreateLocationCommand(CreateLocationDto Location):IRequest<LocationDto>;
    
}
