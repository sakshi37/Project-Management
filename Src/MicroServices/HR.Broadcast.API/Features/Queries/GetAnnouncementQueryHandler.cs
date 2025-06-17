using HR.Broadcast.API.Features.Dtos;
using HR.Broadcast.API.Interfaces;
using MediatR;

namespace HR.Broadcast.API.Features.Queries
{

    public class GetAnnouncementQueryHandler : IRequestHandler<GetAnnouncementQuery, List<AnnouncementDto>>
    {
        private readonly IAnnouncementRepository _repository;

        public GetAnnouncementQueryHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<AnnouncementDto>> Handle(GetAnnouncementQuery request, CancellationToken cancellationToken)
        {
            var announcements = await _repository.GetTodayAnnouncementsAsync();
            return announcements;
        }
    }
}
