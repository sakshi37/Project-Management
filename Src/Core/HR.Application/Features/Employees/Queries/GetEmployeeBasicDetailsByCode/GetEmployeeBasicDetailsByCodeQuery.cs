using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employees.Queries.GetEmployeeBasicDetails
{

    public class GetEmployeeBasicDetailsByCodeQuery : IRequest<GetEmployeeBasicDetailsByCodeQueryVm?>
    {
        public string Code { get; set; }

        public GetEmployeeBasicDetailsByCodeQuery(string code)
        {
            Code = code;
        }
    }
}
