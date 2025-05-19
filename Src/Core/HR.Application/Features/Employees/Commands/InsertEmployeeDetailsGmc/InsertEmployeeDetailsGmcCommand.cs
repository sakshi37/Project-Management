using HR.Application.Features.Employee.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Commands.InsertEmployeeDetailsGmc
{

    public class InsertEmployeeDetailsGmcCommand : IRequest<bool>
    {

        public InsertEmployeeDetailsGmcCommandDto Dto { get; }

        public InsertEmployeeDetailsGmcCommand(InsertEmployeeDetailsGmcCommandDto dto)
        {
            Dto = dto;
        }
    }
}
