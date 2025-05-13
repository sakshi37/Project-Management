using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Queries.GetAllFamilyType
{
    public class GetAllFamilyMemberTypeQueryHandler:  IRequestHandler<GetAllFamilyMemberTypeQuery, List<GetAllFamilyMemberTypeQueryVm>>
    {
        private readonly IFamilyRepository _repo;
        public GetAllFamilyMemberTypeQueryHandler(IFamilyRepository repo)
        {
            _repo = repo;
        }
        public async Task<List<GetAllFamilyMemberTypeQueryVm>> Handle(GetAllFamilyMemberTypeQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }

    }
}
