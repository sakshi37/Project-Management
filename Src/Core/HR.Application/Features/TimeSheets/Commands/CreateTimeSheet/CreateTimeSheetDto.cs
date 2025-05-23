namespace HR.Application.Features.TimeSheet.Commands.CreateTimeSheet
{
    public class CreateTimeSheetDto
    {

        public int JobId { get; set; }
        public string? Sequence { get; set; }
        public string? Part { get; set; }
        public string? Activity { get; set; }
        public string? Type { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndDTime { get; set; }
        public int? Hrs { get; set; }
        public int? Min { get; set; }
        public int? EmpId { get; set; }
        public bool? TimeSheetStatus { get; set; }


    }
}



