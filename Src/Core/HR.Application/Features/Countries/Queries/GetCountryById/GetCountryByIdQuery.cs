using System;
using HR.Application.Features.Countries.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Countries.Queries.GetCountryById;


public record GetCountryByIdQuery(int CountryId) : IRequest<CountryDto>;

