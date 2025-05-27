using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts
{
    public class OtpCacheModel
    {
        public string Otp { get; set; }
        public int Attempts { get; set; }
    }

}
