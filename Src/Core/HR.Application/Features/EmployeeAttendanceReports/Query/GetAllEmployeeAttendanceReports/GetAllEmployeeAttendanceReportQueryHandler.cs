using MediatR;

using HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos;
using HR.Application.Contracts.Models.Persistence;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllEmployeeAttendanceReports
{
    public class GetAllEmployeeAttendanceReportQueryHandler : IRequestHandler<GetAllEmployeeAttendanceReportQuery, List<EmployeeAttendanceReportDto>>
    {
        private readonly IEmployeeAttendanceReportRepository _repo;

        public GetAllEmployeeAttendanceReportQueryHandler(IEmployeeAttendanceReportRepository repo)
        {
         _repo = repo;   
        }

        public async Task<List<EmployeeAttendanceReportDto>> Handle(GetAllEmployeeAttendanceReportQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();        
        }
    }
}

