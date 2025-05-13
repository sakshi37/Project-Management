using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Exception
{
    public class LocationValidationException : ApplicationException
    {
        public LocationValidationException(string message) :base(message)
        {          
        }
    }
}
