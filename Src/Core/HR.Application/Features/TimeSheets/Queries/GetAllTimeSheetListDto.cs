namespace HR.Application.Features.TimeSheet.Queries
{
    public class GetAllTimeSheetListDto
    {
        //public int id { get; set; }
        public int EmployeeId { get; set; }
        public int JobId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CreatedBy { get; set; }
        public bool TimeSheetStatus { get; set; }
    }
}
