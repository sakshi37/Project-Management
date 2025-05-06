using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.States.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.States.Queries.GetAllStates
{
    public record GetAllStatesQuery : IRequest<List<StateDto>>;

}
