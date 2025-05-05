using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Queries.GetAllCountries;
using HR.Application.Features.Designations.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Designations.Queries.GetAllDesignations
{
    public class GetAllDesignationsQueryHandler : IRequestHandler<GetAllDesignationsQuery, List<DesignationDto>>
    {
        private readonly IDesignationRepository _repo;

        public GetAllDesignationsQueryHandler(IDesignationRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<DesignationDto>> Handle(GetAllDesignationsQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }

}
