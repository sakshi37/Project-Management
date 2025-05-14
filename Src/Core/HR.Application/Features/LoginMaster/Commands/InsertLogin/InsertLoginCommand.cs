using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.LoginMaster.Commands.InsertLogin
{
    public class InsertLoginCommand : IRequest<Unit>
    {
        public int EmpId { get; set; }
        public int CreatedBy { get; set; }
    }
}
