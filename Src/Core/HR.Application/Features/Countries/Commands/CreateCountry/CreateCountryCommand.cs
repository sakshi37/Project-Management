using System;
using HR.Application.Features.Countries.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Countries.Commands.CreateCountry;
public record CreateCountryCommand(CreateCountryDto Country) : IRequest<CountryDto>;

