namespace HR.Domain.Entities
{
    public class TimeSheet
    {
        public int JobId { get; set; }
        public string? Sequence { get; set; }
        public string Part { get; set; }
        public string Activity { get; set; }
        public string Type { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndDTime { get; set; }
        public int Hrs { get; set; }
        public int Min { get; set; }
        public int EmpId { get; set; }
        public bool? TimeSheetStatus { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
