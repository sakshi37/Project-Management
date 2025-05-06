using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.MakeEmployeeInactivate
{
    public class MakeEmployeeInactiveCommand:IRequest<string>
    {
        public string Code { get; set; }
        public MakeEmployeeInactiveCommand(string code)
        {
           Code = code;
        }
    }
}
