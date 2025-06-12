using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using MediatR;

namespace HR.Application.Features.Annoucements.Commands.UpdateAnnouncement
{
    public class UpdateAnnouncementHandler : IRequestHandler<UpdateAnnouncementCommand, bool>
    {
        private readonly IAnnouncementRepository _repository;

        public UpdateAnnouncementHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            return await _repository.UpdateAnnouncementAsync(request);
        }
    }

}
