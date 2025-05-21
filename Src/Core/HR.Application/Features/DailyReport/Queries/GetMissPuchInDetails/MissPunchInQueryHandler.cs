using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exceptions;
using HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetMissPuchInDetails
{
    public class MissPunchInQueryHandler:IRequestHandler<MissPunchInQuery, List<MissPunchInQueryVm>>
    {
        private readonly IAttendanceRepository _repository;
        public MissPunchInQueryHandler(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<MissPunchInQueryVm>> Handle(MissPunchInQuery request,CancellationToken cancellationToken)
        {
            var data = await _repository.GetMissPunchInReportAsync(request.StartDate);

            if (data == null || !data.Any())
            {
                throw new NotFoundException("No report found for the selected date.");
            }

            return data.Select(d => new MissPunchInQueryVm
            {
                Code = d.Code,
                Name = d.Name,
                DepartmentName = d.DepartmentName,
                StartDate = d.StartDate,
                EndDate = d.EndDate
            }).ToList();
        }
    }
}
