using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models
{
    public class LoginResponse
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Otp { get; set; }
        public DateTime OtpExpiryTime { get; set; }
        public bool FirstLogin { get; set; }
        public string RoleName { get; set; }
        public bool LoginStatus { get; set; }
        public DateTime UserCheckInTime { get; set; }
        public int fk_EmpId { get; set; }
        public string? Token{ get; set; }


            //public int EmpId { get; set; }
        }
}
