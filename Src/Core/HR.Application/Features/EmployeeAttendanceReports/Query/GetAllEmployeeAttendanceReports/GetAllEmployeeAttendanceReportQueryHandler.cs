using MediatR;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;

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

