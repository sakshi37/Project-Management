using HR.Application.Contracts.Models.Persistence;
using HR.Application.Exceptions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.DailyReport.Queries.GetMissPunchOutDetails
{
    public class MissPunchOutQueryHandler : IRequestHandler<MissPunchOutQuery, List<MissPunchOutQueryVm>>
    {
        private readonly IAttendanceRepository _repository;

        public MissPunchOutQueryHandler(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<MissPunchOutQueryVm>> Handle(MissPunchOutQuery request, CancellationToken cancellationToken)
        {
            var data = await _repository.GetMissPunchOutReportAsync(request.StartDate);

            if (data == null || !data.Any())
            {
                throw new NotFoundException("No report found for the selected date.");
            }

            return data.Select(d => new MissPunchOutQueryVm
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

