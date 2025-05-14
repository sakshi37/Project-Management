namespace HR.Domain.Entities
{
    public class Attendance
    {
        public int Id { get; set; }
        public int Fk_EmpId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
