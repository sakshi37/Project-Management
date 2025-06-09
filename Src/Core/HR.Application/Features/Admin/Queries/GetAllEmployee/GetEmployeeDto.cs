namespace HR.Application.Features.Admin.Queries.GetAllEmployee
{
    public class GetEmployeeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Email { get; set; }
        public string? Fk_UserGroupId { get; set; }
    }
}
