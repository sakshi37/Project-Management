using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllEmployeeAttendanceReports
{
    public class GetAllEARDivisionNameQueryHandler:IRequestHandler<GetAllEARDivisionNameQuery , List<EmployeeAttendanceReportDto>>
    {
        private readonly IEmployeeAttendanceReportRepository  _repo;
        public GetAllEARDivisionNameQueryHandler(IEmployeeAttendanceReportRepository repo)
        {
            _repo = repo;   
            
        }

        public async  Task<List<EmployeeAttendanceReportDto>> Handle(GetAllEARDivisionNameQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllDivisionName(request.divisionName);
        }
    }
}
