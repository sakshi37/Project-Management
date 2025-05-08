using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Querry.GetAllLocationQuerry
{
    public class GetAllLocationQueryHandler : IRequestHandler<GetAllLocationQuery, List<LocationDto>>
    {
        private readonly ILocationRepository _repo;
        public GetAllLocationQueryHandler(ILocationRepository repo)
        {
            _repo = repo;
        }
        public  async Task<List<LocationDto>> Handle(GetAllLocationQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }
}
