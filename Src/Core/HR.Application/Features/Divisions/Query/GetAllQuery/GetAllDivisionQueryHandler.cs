        using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Queries.GetAllCities;
using HR.Application.Features.Divisions.Command.Dto;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Query.GetAllQuery
{
    public class GetAllDivisionQueryHandler : IRequestHandler<GetAllDivisionQuery, List<GetAllDivisionDto>>
    {
        private readonly IDivisionRepositry _repo;
        public GetAllDivisionQueryHandler(IDivisionRepositry repo)
        {
            _repo = repo;
        }

        public async Task<List<GetAllDivisionDto>> Handle(GetAllDivisionQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();

        }

        
    }


}