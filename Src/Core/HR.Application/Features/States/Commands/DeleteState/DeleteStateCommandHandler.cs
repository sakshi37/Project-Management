using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.DeleteCountry;
using MediatR;

namespace HR.Application.Features.States.Commands.DeleteState
{
    public class DeleteStateCommandHandler : IRequestHandler<DeleteStateCommand, bool>
    {
        private readonly IStateRepository _repo;

        public DeleteStateCommandHandler(IStateRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteStateCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.StateId, request.UpdatedBy);
            return true;
        }
    }
}
