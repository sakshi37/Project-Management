using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Annoucements.Dtos;
using MediatR;

namespace HR.Application.Features.Annoucements.Commands.CreateBroadcastAnnoucement
{
    public record CreateBroadcastAnnouncementCommand(BroadcastAnnouncementDto AnnouncementDto)
    : IRequest<string>;
}
