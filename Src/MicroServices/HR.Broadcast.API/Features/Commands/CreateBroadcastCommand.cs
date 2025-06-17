using HR.Broadcast.API.Features.Dtos;
using MediatR;

namespace HR.Broadcast.API.Features.Commands
{
    public record CreateBroadcastCommand(AnnouncementDto Announcementdto) :IRequest<string>;
}
