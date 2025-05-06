using System;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Countries.Queries.GetAllCountries;


public class GetAllCountriesQueryHandler : IRequestHandler<GetAllCountriesQuery, List<CountryDto>>
{
    private readonly ICountryRepository _repo;

    public GetAllCountriesQueryHandler(ICountryRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<CountryDto>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
    {
        return await _repo.GetAllAsync();
    }
}

