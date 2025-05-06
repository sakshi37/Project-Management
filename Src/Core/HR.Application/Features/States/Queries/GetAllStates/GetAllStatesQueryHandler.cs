using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Queries.GetAllCountries;
using HR.Application.Features.States.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.States.Queries.GetAllStates
{
    public class GetAllStatesQueryHandler : IRequestHandler<GetAllStatesQuery, List<StateDto>>
    {
        private readonly IStateRepository _repo;

        public GetAllStatesQueryHandler(IStateRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<StateDto>> Handle(GetAllStatesQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }
}
