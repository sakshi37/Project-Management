using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using MediatR;
using System.ComponentModel;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Application.Features.LoginMaster.Commands.InsertLogin
{
    public class InsertLoginCommandHandler : IRequestHandler<InsertLoginCommand,Unit>
    {

        private readonly ILoginService _loginService;
            private readonly IEmailService _emailService;

            public InsertLoginCommandHandler(ILoginService loginService, IEmailService emailService)
            {
            _loginService = loginService;
                _emailService = emailService;
            }
        //public async Task<Unit> Handle(InsertLoginCommand request, CancellationToken cancellationToken)
        //{
        //    var passwordBytes = Encoding.UTF8.GetBytes(request.Password);
        //    await _loginService.InsertLogAsync(request.EmpId, request.CreatedBy, passwordBytes);
        //    return Unit.Value;
        //}
        public async Task<Unit> Handle(InsertLoginCommand request, CancellationToken cancellationToken)
        {
            // 1. Auto-generate password
            var generatedPassword = GenerateRandomPassword(8); // you can adjust the length

            // 2. Convert to byte array
            var passwordBytes = Encoding.UTF8.GetBytes(generatedPassword);

            // 3. Save to database
            await _loginService.InsertLogAsync(request.EmpCode, passwordBytes);

            // 4. Send password via email
            var emailRequest = new MailRequest
            {
                Email = request.Email,
                Subject = "Your New Login Password",
                EmailBody = $@"
        <p>Dear User,</p>
        <p>Your <strong>Username</strong> is: <strong>{request.EmpCode}</strong></p>
        <p>Your <strong>Password</strong> is: <strong>{generatedPassword}</strong></p>
        <p>Please change it after logging in.</p>"
            };
            await _emailService.SendEmail(emailRequest);

            return Unit.Value;
        }

        private string GenerateRandomPassword(int length)
        {
            const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
            var random = new Random();
            var password = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                password.Append(validChars[random.Next(validChars.Length)]);
            }

            return password.ToString();
        }


    }
}
