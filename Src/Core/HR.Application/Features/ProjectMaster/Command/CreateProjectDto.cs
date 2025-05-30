namespace HR.Application.Features.ProjectMaster.Command
{
    public class CreateProjectDto
    {
        public int Fk_TeamLeaderId { get; set; }
        public string Name { get; set; }
        public List<int> StackIds { get; set; }
    }
}
