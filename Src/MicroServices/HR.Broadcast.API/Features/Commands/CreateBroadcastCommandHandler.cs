using HR.Broadcast.API.Features.Dtos;
using HR.Broadcast.API.Interfaces;
using MediatR;

namespace HR.Broadcast.API.Features.Commands
{
    public class CreateBroadCastCommandHandler : IRequestHandler<CreateBroadcastCommand,string>
    {
        private readonly IAnnouncementRepository _repository;

        public CreateBroadCastCommandHandler(IAnnouncementRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Handle(CreateBroadcastCommand request, CancellationToken cancellationToken)
        {
            return await _repository.InsertAsync(request.Announcementdto);
        }
    }
}
