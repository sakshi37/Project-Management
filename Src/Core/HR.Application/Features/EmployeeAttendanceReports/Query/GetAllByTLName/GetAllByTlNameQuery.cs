using HR.Application.Features.EmployeeAttendanceReports.Dtos.EmployeeAttendanceReportDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByTLName
{
    public record GetAllByTlNameQuery(int employeeId):IRequest<List<EmployeeAttendanceReportDto>>;
    
    
}
