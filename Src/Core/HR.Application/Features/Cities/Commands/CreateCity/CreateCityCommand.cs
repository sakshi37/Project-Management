using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Cities.Commands.CreateCity
{
    public record CreateCityCommand(CreateCityDto City) : IRequest<CityDto>;

}
