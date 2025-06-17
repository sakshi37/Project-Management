using MediatR;

namespace HR.Broadcast.API.Features.Commands
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
