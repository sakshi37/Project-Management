﻿
namespace HR.Application.Contracts.Models
{
    public class MailRequest
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string EmailBody { get; set; }
    }
}
