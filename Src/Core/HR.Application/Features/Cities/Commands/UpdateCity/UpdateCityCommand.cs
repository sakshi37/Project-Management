using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using MediatR;

namespace HR.Application.Features.Cities.Commands.UpdateCity
{
    public record UpdateCityCommand(UpdateCityDto City) : IRequest<CityDto>;

}
