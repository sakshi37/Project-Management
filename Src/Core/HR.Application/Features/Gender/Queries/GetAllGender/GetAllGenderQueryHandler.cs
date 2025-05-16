using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Application.Features.Gender.Queries.GetAllGender
{
    public class GetAllGenderQueryHandler : IRequestHandler<GetAllGenderQuery, List<GetAllGenderQueryVm>>
    {
        private readonly IGenderRepository _repo;

        public GetAllGenderQueryHandler(IGenderRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<GetAllGenderQueryVm>> Handle(GetAllGenderQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }
}
