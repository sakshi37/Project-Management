using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Commands.AddFamilyDetails
{
    public  class AddFamilyDetailsCommandHandler : IRequestHandler<AddFamilyDetailsCommand, bool>
    {
        private readonly IFamilyRepository _repository;

        public AddFamilyDetailsCommandHandler(IFamilyRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(AddFamilyDetailsCommand request, CancellationToken cancellationToken)
        {
            return await _repository.AddFamilyMemberAsync(request.FamilyMemberDto);
        }
    }
}
