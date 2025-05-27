using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Commands.UpdateCity;
using HR.Application.Features.Divisions.Command.Dtos;
using HR.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.UpdateDivision
{
    public record UpdateDivisionCommand(UpdateDivisionDto Division) : IRequest<division>;
}
