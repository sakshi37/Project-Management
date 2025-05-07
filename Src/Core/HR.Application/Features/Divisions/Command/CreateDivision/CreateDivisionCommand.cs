using HR.Application.Features.Divisions.Command.Dto;
using HR.Application.Features.Locations.Commands.CreateLocation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.CreateLocationCommand
{
    public record CreateDivisionCommand(CreateDivisionDto Division) : IRequest<DivisionDtos>;

}
