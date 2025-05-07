using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Exceptions
{
    public class UserNotFoundException:ApplicationException
    {
        public UserNotFoundException(string msg) :base(msg)
        {
        }
    }
}
