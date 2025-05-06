using System;
using HR.Application.Contracts.Models.Persistence;
using MediatR;

namespace HR.Application.Features.Countries.Commands.DeleteCountry;

public class DeleteCountryCommandHandler : IRequestHandler<DeleteCountryCommand, bool>
{
    private readonly ICountryRepository _repo;

    public DeleteCountryCommandHandler(ICountryRepository repo)
    {
        _repo = repo;
    }

    public async Task<bool> Handle(DeleteCountryCommand request, CancellationToken cancellationToken)
    {
        await _repo.DeleteAsync(request.CountryId, request.UpdatedBy);
        return true;
    }
}
