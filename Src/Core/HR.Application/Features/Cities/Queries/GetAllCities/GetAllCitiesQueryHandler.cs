using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Queries.GetAllStates;
using MediatR;

namespace HR.Application.Features.Cities.Queries.GetAllCities
{
    public class GetAllCitiesQueryHandler : IRequestHandler<GetAllCitiesQuery, List<CityDto>>
    {
        private readonly ICityRepository _repo;

        public GetAllCitiesQueryHandler(ICityRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CityDto>> Handle(GetAllCitiesQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }
}
