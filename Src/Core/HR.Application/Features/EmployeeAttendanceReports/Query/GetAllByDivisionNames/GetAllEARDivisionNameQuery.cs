using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByDivisionNames
{
    public record  GetAllEARDivisionNameQuery(string divisionName) :IRequest<List<EmployeeAttendanceReportDto>>;
    
    
}
