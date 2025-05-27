using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exceptions;
using HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetHalfDayDetails
{
    public class HalfDayQueryHandler : IRequestHandler<HalfDayQuery, List<HalfDayQueryVm>>
    {
        private readonly IAttendanceRepository _attendanceRepository;
        public HalfDayQueryHandler(IAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        }

        public async Task<List<HalfDayQueryVm>> Handle(HalfDayQuery request, CancellationToken cancellationToken)
        {
            var data = await _attendanceRepository.GetHalfDayReportAsync(request.StartDate);

            if (data == null || !data.Any())
            {
                throw new NotFoundException("No report found for the selected date.");
            }

            return data.Select(d => new HalfDayQueryVm
            {
                Code = d.Code,
                Name = d.Name,
                DepartmentName = d.DepartmentName,
                StartDate = d.StartDate,
                EndDate = d.EndDate,
                TotalHours = d.TotalHours,
            }).ToList();
        }
    }
}
