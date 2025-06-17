using HR.Broadcast.API.Features.Dtos;
using HR.Broadcast.API.Interfaces;
using MediatR;

namespace HR.Broadcast.API.Features.Queries
{
    public class GetAnnouncementsForUserQueryHandler : IRequestHandler<GetAnnouncementsForUserQuery, List<AnnouncementDto>>
    {
        private readonly IAnnouncementRepository _repo;

        public GetAnnouncementsForUserQueryHandler(IAnnouncementRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<AnnouncementDto>> Handle(GetAnnouncementsForUserQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAnnouncementsForUserAsync(request.Request.EmployeeCode, request.Request.UserGroup);
        }
    }

}
