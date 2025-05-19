using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Domain.Entities;

using HR.Application.Features.EmployeeAttendanceReports.EmployeeAttendanceReportDtos;
namespace HR.Application.Features.EmployeeAttendanceReports.Query.GetAllByDivisionNames
{
   public record GetAllEmployeeAttendanceReportQuery() : IRequest<List<EmployeeAttendanceReportDto>>;
   
    
}
