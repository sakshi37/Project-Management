﻿
namespace HR.Application.Contracts.Models
{
    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool FirstLogin { get; set; }
        public bool LoginStatus { get; set; }
        public int fk_EmpId { get; set; }

        //public string Email { get; set; }
    }
}
