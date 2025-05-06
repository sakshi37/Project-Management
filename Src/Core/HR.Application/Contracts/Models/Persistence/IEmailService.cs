using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models;

namespace HR.Application.Contracts.Persistence
{
    public interface IEmailService
    {
        Task SendEmail(MailRequest mailRequest);
    }
}
