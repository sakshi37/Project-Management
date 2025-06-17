using HR.Broadcast.API.Features.Dtos;
using MediatR;

namespace HR.Broadcast.API.Features.Queries
{
    public record GetAnnouncementQuery() : IRequest<List<AnnouncementDto>>;

}
