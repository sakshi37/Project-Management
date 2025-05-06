using System;
using HR.Application.Features.Countries.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Countries.Queries.GetAllCountries;

public record GetAllCountriesQuery : IRequest<List<CountryDto>>;

