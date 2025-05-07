using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Exceptions
{
    public class OtpNotFoundException:ApplicationException
    {
        public OtpNotFoundException(string msg):base(msg)
        {
            
        }
    }
}
