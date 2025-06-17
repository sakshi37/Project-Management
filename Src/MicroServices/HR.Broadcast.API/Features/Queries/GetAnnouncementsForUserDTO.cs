namespace HR.Broadcast.API.Features.Queries
{

    public class GetAnnouncementsForUserDTO
    {
        public string EmployeeCode { get; set; } = string.Empty;
        public string UserGroup { get; set; } = string.Empty;
    }
}
