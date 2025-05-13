using HR.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.DeleteLocation
{
    public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand, bool>
    {

        readonly ILocationRepository _locationRepository;
        public DeleteLocationCommandHandler(ILocationRepository Repo)
        {
            _locationRepository = Repo;

        }
        public async Task<bool> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
        {
            await _locationRepository.DeleteAsync(request.LocationId, request.UpdatedBy);
            return true;
        }

    }
}
