using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Notification.Queries
{
    public class GetNotificationByCodeQuery:IRequest<List<GetNotificationByCodeVm>>
    {
        public string EmpCode { get; set; }
        public GetNotificationByCodeQuery(string code)
        {
            EmpCode = code;
        }
    }
}
