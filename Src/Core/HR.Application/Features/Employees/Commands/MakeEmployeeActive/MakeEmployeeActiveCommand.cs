using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.MakeEmployeeActive
{
    public class MakeEmployeeActiveCommand:IRequest<string>
    {
        public string Code { get; set; }
        public MakeEmployeeActiveCommand(string code)
        {
            Code = code;
        }

    }
}
