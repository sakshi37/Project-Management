using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Commands.ApproveRequest
{
    public class ApproveRequestCommandHandler:IRequestHandler<ApproveRequestCommand, string>
    {
        private readonly IAdminRepository _adminRepository;
        public ApproveRequestCommandHandler(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<string> Handle(ApproveRequestCommand request,CancellationToken cancellationToken)
        {
            return await _adminRepository.ApproveRequestAsync(request.RequestId, request.EmpCode, request.Comment);

        }
    }
}
