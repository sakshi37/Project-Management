using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.DeleteCity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Commands.DeleteBranch
{
    public  class DeleteBranchCommandHandler: IRequestHandler<DeleteBranchCommand, bool>
    {
        private readonly IBranchRepository _repo;

        public DeleteBranchCommandHandler(IBranchRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteBranchCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.BranchId, request.UpdatedBy);
            return true;
        }


    }
}
