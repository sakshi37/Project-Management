﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition
{
    public record CreateTeamCompositionCommand(CreateTeamCompositionDto TeamComposition) : IRequest<TeamCompositionDto>;

}
