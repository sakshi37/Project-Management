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
    public record  GetPraticularEmployeeQuery(): IRequest< List<ParticularEmployeeDto>>;
    
    
}
