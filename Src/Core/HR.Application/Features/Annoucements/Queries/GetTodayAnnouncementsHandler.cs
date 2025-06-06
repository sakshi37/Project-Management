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
    public class GetTodayAnnouncementsHandler : IRequestHandler<GetTodayAnnouncementsQuery, List<BroadcastAnnouncementDto>>
    {
        private readonly IAnnouncementRepository _repository;

        public GetTodayAnnouncementsHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<BroadcastAnnouncementDto>> Handle(GetTodayAnnouncementsQuery request, CancellationToken cancellationToken)
        {
            var announcements = await _repository.GetTodayAnnouncementsAsync();
            return announcements;
        }
    }
}
