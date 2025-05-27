using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.MakeMultipleEmployeesInactive
{
    public class MakeMultipleEmployeesInactiveCommannd:IRequest<string>
    {
        public List<string> EmployeeCodes { get; set; }

    }

}
