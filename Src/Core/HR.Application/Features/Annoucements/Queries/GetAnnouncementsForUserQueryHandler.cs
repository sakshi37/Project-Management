using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Annoucements.Dtos;
using MediatR;

namespace HR.Application.Features.Annoucements.Queries
{

    public class GetAnnouncementsForUserQueryHandler : IRequestHandler<GetAnnouncementsForUserQuery, List<BroadcastAnnouncementDto>>
    {
        private readonly IAnnouncementRepository _repo;

        public GetAnnouncementsForUserQueryHandler(IAnnouncementRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<BroadcastAnnouncementDto>> Handle(GetAnnouncementsForUserQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAnnouncementsForUserAsync(request.Request.EmployeeCode, request.Request.UserGroup);
        }
    }

}
