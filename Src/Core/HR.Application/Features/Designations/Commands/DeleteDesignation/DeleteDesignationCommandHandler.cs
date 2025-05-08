using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.DeleteCountry;
using MediatR;

namespace HR.Application.Features.Designations.Commands.DeleteDesignation
{
    public class DeleteDesignationCommandHandler : IRequestHandler<DeleteDesignationCommand, bool>
    {
        private readonly IDesignationRepository _repo;

        public DeleteDesignationCommandHandler(IDesignationRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteDesignationCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.DesignationId, request.UpdatedBy);
            return true;
        }
    }
}
