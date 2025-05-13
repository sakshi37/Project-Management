namespace HR.Domain.Entities
{
    public class TimeSheet
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int EmpId { get; set; }
        public string? Sequence { get; set; }
        public int JobId { get; set; }
        public bool? TimeSheetStatus { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
