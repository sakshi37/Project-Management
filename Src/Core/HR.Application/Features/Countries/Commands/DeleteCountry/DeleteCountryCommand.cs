using System;
using MediatR;

namespace HR.Application.Features.Countries.Commands.DeleteCountry;

public record DeleteCountryCommand(int CountryId, int UpdatedBy) : IRequest<bool>;
