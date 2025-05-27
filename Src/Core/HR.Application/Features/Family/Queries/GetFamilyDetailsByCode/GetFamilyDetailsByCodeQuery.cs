using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Queries.GetFamilyDetailsByCode
{
    public class GetFamilyDetailsByCodeQuery: IRequest<List<GetFamilyDetailsByCodeQueryVm>>
    {
        public string Code { get; set; }

        public GetFamilyDetailsByCodeQuery(string code)
        {
            Code = code;
        }
    }

}
