using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.TeamCompositions.Commands.UpdateTeamComposition
{

    public class UpdateTeamCompositionCommandHandler : IRequestHandler<UpdateTeamCompositionCommand, TeamCompositionDto>
    {
        private readonly ITeamCompositionRepository _repository;
        private readonly IMapper _mapper;


        public UpdateTeamCompositionCommandHandler(ITeamCompositionRepository repository , IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<TeamCompositionDto> Handle(UpdateTeamCompositionCommand request, CancellationToken cancellationToken)
        {
            var Team = await _repository.UpdateAsync(request.Team);
            return _mapper.Map<TeamCompositionDto>(Team);

        }
    }

}
