using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.TeamCompositions.Queries.GetAllTeamLeaders
{

    public class GetAllTeamLeaderQueryHandler : IRequestHandler<GetAllTeamLeaderQuery, List<TeamLeaderDto>>
    {
        private readonly ITeamCompositionRepository _repository;

        public GetAllTeamLeaderQueryHandler(ITeamCompositionRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TeamLeaderDto>> Handle(GetAllTeamLeaderQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetTeamLeadersAsync();
        }
    }
}
