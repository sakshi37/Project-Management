using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.TeamCompositions.Queries.GetAllTeamCompositions
{
    public class GetAllTeamCompositionQueryHandler : IRequestHandler<GetAllTeamCompositionQuery, List<TeamCompositionDto>>
    {
        private readonly ITeamCompositionRepository _repo;
        public GetAllTeamCompositionQueryHandler(ITeamCompositionRepository repo)
        {
            _repo = repo;

        }

        //public async Task<List<TeamCompositionDto>> Handle(GetAllTeamCompositionQuery request, CancellationToken cancellationToken)
        //{
        //    return await _repo.GetAllAsync();
        //}
        public async Task<List<TeamCompositionDto>> Handle(GetAllTeamCompositionQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync(request.BranchId, request.DivisionId);
        }

    }

}
