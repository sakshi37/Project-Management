namespace HR.Application.Features.TimeSheet.Commands.UpdateTimeSheet
{
    public class UpdateTimeSheetDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Hrs { get; set; }
        public int Mins { get; set; }
    }
}