using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;
using HR.Application.Features.EmployeeAttendanceReports.Dtos.ParticularEmployeeDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetParticularEmployee
{
    public class GetParticularEmployeeQueryHandler : IRequestHandler<GetPraticularEmployeeQuery, List<ParticularEmployeeDto>> 
    
    {
        private readonly IEmployeeAttendanceReportRepository _repo;
        public GetParticularEmployeeQueryHandler(IEmployeeAttendanceReportRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<ParticularEmployeeDto>> Handle(GetPraticularEmployeeQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetEmployee();
        }
    }
}
