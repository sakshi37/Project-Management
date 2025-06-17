namespace HR.Broadcast.API.Features.Dtos
{
    public class AnnouncementDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string TargetType { get; set; } // All, UserGroup, Employee
        public string TargetValue { get; set; }
    }

}
