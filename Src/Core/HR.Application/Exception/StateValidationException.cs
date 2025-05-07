using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Exception
{

    public class StateValidationException : ApplicationException
    {
        public StateValidationException(string message) : base(message)
        {
        }
    }
}
