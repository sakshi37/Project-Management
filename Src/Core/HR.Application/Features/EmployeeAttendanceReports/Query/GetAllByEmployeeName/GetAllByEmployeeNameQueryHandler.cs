using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByEmployeeName
{
    public class GetAllByEmployeeNameQueryHandler :IRequestHandler<GetAllByEmployeeNamequery,List<EmployeeAttendanceReportDto>>
    {
        private readonly IEmployeeAttendanceReportRepository _repo;
        public GetAllByEmployeeNameQueryHandler(IEmployeeAttendanceReportRepository repo)
        {
            _repo = repo;
        }

        public async  Task<List<EmployeeAttendanceReportDto>> Handle(GetAllByEmployeeNamequery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllEmployeeName(request.employeeName);

        }
    }
    
}
