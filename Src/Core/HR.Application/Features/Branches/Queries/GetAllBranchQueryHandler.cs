using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Branches.Commands.Dtos;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Queries.GetAllCities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Queries
{
    public class GetAllBranchQueryHandler : IRequestHandler<GetAllBranchesQuery, List<BranchDto>>
    {
        private readonly IBranchRepository _repo;

        public GetAllBranchQueryHandler(IBranchRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<BranchDto>> Handle(GetAllBranchesQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }
}
