using System;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Countries.Queries.GetCountryById;

public class GetCountryByIdQueryHandler : IRequestHandler<GetCountryByIdQuery, CountryDto>
{
    private readonly ICountryRepository _repo;

    public GetCountryByIdQueryHandler(ICountryRepository repo)
    {
        _repo = repo;
    }

    public async Task<CountryDto> Handle(GetCountryByIdQuery request, CancellationToken cancellationToken)
    {
        return await _repo.GetByIdAsync(request.CountryId);
    }
}
