using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.UserGroup.Queries.GetAllUserGroup
{
    public class GetAllUserGroupQueryHandler : IRequestHandler<GetAllUserGroupQuery, List<GetAllUserGroupQueryVm>>
    {
        private readonly IUserGroupRepository _repo;
        public GetAllUserGroupQueryHandler(IUserGroupRepository repo)
        {
            _repo = repo;
        }
        public async Task<List<GetAllUserGroupQueryVm>> Handle(GetAllUserGroupQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }

    }
}
