namespace HR.Broadcast.API.Models
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string TargetType { get; set; } // All, UserGroup, Employee
        public string TargetValue { get; set; } // null / single UserGroupId / comma-separated EmpIds
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
