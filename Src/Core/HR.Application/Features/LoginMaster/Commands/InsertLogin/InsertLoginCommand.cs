using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.LoginMaster.Commands.InsertLogin
{
    public class InsertLoginCommand: IRequest<Unit>
    {
        
    public string EmpCode { get; set; }
        //public int CreatedBy { get; set; }
        //public string Password { get; set; }
        public string Email { get; set; }
    }
} 

