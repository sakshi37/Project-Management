using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.Annoucements.Commands.UpdateAnnouncement
{

    public class UpdateAnnouncementCommand : IRequest<bool>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string TargetType { get; set; }
        public string TargetValue { get; set; }
    }

}
