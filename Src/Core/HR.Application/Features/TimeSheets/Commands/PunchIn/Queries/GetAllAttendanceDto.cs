namespace HR.Application.Features.TimeSheets.Commands.PunchIn.Queries
{
    public class GetAllAttendanceDto
    {
        //public int Id { get; set; }
        public int Fk_EmpId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
