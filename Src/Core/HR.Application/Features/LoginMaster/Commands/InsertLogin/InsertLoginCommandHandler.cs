using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using MediatR;
using System.ComponentModel;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Application.Features.LoginMaster.Commands.InsertLogin
{
    public class InsertLoginCommandHandler : IRequestHandler<InsertLoginCommand, bool>
    {

        private readonly ILoginService _loginService;
            private readonly IEmailService _emailService;

            public InsertLoginCommandHandler(ILoginService loginService, IEmailService emailService)
            {
            _loginService = loginService;
                _emailService = emailService;
            }

        public async Task<bool> Handle(InsertLoginCommand request, CancellationToken cancellationToken)
        {
            var employee = await _loginService.GetByIdAsync(request.Dto.EmpId);
            if (employee == null)
                throw new System.Exception("Employee not found");

            var plainPassword = await _loginService.InsertLoginAsync(request.Dto.EmpId, request.Dto.CreatedBy);

            string body = $@"
            <p>Dear {employee.Name},</p>
            <p>Your login credentials are:</p>
            <ul>
                <li><strong>Username:</strong> {employee.Code}</li>
                <li><strong>Password:</strong> {plainPassword}</li>
            </ul>
            <p>Please login and change your password immediately.</p>";

            var mailRequest = new MailRequest
            {
                Email = employee.Email,
                Subject = "Your Login Credentials",
                EmailBody = body
            };

            await _emailService.SendEmail(mailRequest);

            return true;
        }


    }
}
