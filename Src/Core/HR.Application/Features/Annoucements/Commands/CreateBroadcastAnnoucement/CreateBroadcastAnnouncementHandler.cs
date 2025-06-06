using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using MediatR;

namespace HR.Application.Features.Annoucements.Commands.CreateBroadcastAnnoucement
{
    public class CreateBroadcastAnnouncementHandler : IRequestHandler<CreateBroadcastAnnouncementCommand, string>
    {
        private readonly IAnnouncementRepository _repository;

        public CreateBroadcastAnnouncementHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Handle(CreateBroadcastAnnouncementCommand request, CancellationToken cancellationToken)
        {
            return await _repository.InsertAsync(request.AnnouncementDto);
        }
    }

}
