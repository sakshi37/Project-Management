using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Application.Features.LoginMaster.Commands.InsertLogin
{
    public class InsertLoginCommandHandler : IRequestHandler<InsertLoginCommand, Unit>
    {
               
            private readonly ILoginService _loginService;
            private readonly IEmailService _emailService;

            public InsertLoginCommandHandler(ILoginService loginService, IEmailService emailService)
            {
            _loginService = loginService;
                _emailService = emailService;
            }

        public async Task<Unit> Handle(InsertLoginCommand request, CancellationToken cancellationToken)
        {
            await _loginService.InsertLoginAsync(request.EmpId, request.CreatedBy);
            return Unit.Value;
        }


    }
}
