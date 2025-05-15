using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Holidays.Commands.CreateHoliday;
using HR.Application.Features.Holidays.Commands.Dtos;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition
{
    public class CreateTeamCompositionCommandHandler : IRequestHandler<CreateTeamCompositionCommand, TeamCompositionDto>
    {
        private readonly ITeamCompositionRepository _repo;
        private readonly IMapper _mapper;

        public CreateTeamCompositionCommandHandler(ITeamCompositionRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<TeamCompositionDto> Handle(CreateTeamCompositionCommand request, CancellationToken cancellationToken)
        {
            var teamcomposition = await _repo.CreateAsync(request.TeamComposition);
            return _mapper.Map<TeamCompositionDto>(teamcomposition);
        }
    }

}
