namespace HR.Application.Features.Employee.Commands.Query
{
    public class GetEmployeeVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DesignationId { get; set; }

        public string Code { get; set; }

        public int BranchId { get; set; }
        public int DivisionId { get; set; }
        public int UserGroupId { get; set; }
        public string BranchName { get; set; }

    }
}
