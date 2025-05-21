using HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByEmployeeName
{
    public record GetAllByEmployeeNamequery(string employeeName):IRequest<List<EmployeeAttendanceReportDto>>;
    
    
}
