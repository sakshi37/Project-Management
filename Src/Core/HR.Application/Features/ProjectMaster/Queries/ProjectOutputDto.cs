namespace HR.Application.Features.ProjectMaster.Query
{
    public class ProjectOutputDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<StackModel> Stack { get; set; }
    }


    public class StackModel
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
    }
}
