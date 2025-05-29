using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.TimeSheets.Commands.UpdateTimeSheet
{
    public class UpdateTimeSheetDto
    {
        public int Id { get; set; }
        public string? Sequence { get; set; }
        public string? Part { get; set; }
        public string? Activity { get; set; }
        public string? Type { get; set; }
        //public DateTime? StartTime { get; set; }
        //public DateTime? EndTime { get; set; }
        //public int? Hrs { get; set; }
        //public int? Min { get; set; }
        public int? Fk_EmpId { get; set; }
        //public bool? TimeSheetStatus { get; set; }

    }
}
