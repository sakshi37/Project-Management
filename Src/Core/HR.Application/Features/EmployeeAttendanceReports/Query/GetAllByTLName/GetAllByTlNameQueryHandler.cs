using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByTLName
{
    public class GetAllByTlNameQueryHandler : IRequestHandler<GetAllByTlNameQuery, List<EmployeeAttendanceReportDto>>
    {
        public readonly IEmployeeAttendanceReportRepository _repo;

        public GetAllByTlNameQueryHandler(IEmployeeAttendanceReportRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<EmployeeAttendanceReportDto>> Handle(GetAllByTlNameQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllTL(request.employeeId);
        }
    }
}
