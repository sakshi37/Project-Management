using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.States.Commands.DeleteState;
using MediatR;

namespace HR.Application.Features.Cities.Commands.DeleteCity
{
    public class DeleteCityCommandHandler : IRequestHandler<DeleteCityCommand, bool>
    {
        private readonly ICityRepository _repo;

        public DeleteCityCommandHandler(ICityRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteCityCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.CityId, request.UpdatedBy);
            return true;
        }
    }
}
