namespace HR.Application.Features.ProjectMaster.Command
{
    public class CreateProjectDto
    {
        public string Name { get; set; }
        public List<int> StackIds { get; set; }
    }
}
