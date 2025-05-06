using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models
{
    public class UpdatePasswordResponse
    {
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}