using System;
using HR.Application.Features.Countries.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Countries.Commands.UpdateCountry;


public record UpdateCountryCommand(UpdateCountryDto Country) : IRequest<CountryDto>;
