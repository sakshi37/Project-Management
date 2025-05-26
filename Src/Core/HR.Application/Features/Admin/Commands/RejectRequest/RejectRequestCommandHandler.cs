using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.RejectRequest
{
    public class RejectRequestCommandHandler : IRequestHandler<RejectRequestCommand, string>
    {
        private readonly IAdminRepository _adminRepository;
        public RejectRequestCommandHandler(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<string> Handle(RejectRequestCommand request, CancellationToken cancellationToken)
        {
            return await _adminRepository.RejectRequestAsync(request.RequestId, request.EmpCode,request.Comment);

        }
    }
}
