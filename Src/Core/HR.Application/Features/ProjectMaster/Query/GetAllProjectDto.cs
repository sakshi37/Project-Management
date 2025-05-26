namespace HR.Application.Features.ProjectMaster.Query
{
    public class GetAllProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int StackId { get; set; }

        public string StackName { get; set; }
    }
}
