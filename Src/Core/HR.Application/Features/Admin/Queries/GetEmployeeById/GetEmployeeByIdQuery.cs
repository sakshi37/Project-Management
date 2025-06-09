using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Admin.Queries.GetAllEmployee;
using MediatR;

namespace HR.Application.Features.Admin.Queries.GetEmployeeById

{
    public record  GetEmployeeByIdQuery(int id):IRequest<List<GetEmployeeByIdDto>>;
    
}
