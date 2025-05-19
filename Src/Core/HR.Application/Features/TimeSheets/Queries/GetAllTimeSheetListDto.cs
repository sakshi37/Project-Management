namespace HR.Application.Features.TimeSheet.Queries
{
    public class GetAllTimeSheetListDto
    {
        public int JobId { get; set; }
        public string? Sequence { get; set; }
        public string Part { get; set; }
        public string Activity { get; set; }
        public string Type { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int Hrs { get; set; }
        public int Min { get; set; }
        public int EmpId { get; set; }
        public bool? TimeSheetStatus { get; set; }
    }
}
