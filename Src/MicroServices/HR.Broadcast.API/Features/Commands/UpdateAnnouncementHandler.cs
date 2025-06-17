using HR.Broadcast.API.Interfaces;
using MediatR;

namespace HR.Broadcast.API.Features.Commands
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
