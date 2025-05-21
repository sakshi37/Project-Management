using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Queries.GetPendingRequest
{
    public class PendingRequestQueryHandler:IRequestHandler<PendingRequestQuery , List<PendingRequestVm>>
    {
        private readonly IAdminRepository _adminRepository;
        public PendingRequestQueryHandler(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<List<PendingRequestVm>> Handle(PendingRequestQuery request,CancellationToken cancellationToken)
        {
            return await _adminRepository.GetPendingRequestAsync();
        }
    }
}
