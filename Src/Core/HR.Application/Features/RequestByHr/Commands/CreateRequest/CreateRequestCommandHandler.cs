using HR.Application.Contracts.Models.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.RequestByHr.Commands.CreateRequest
{
    public class CreateRequestCommandHandler : IRequestHandler<CreateRequestCommand, int>
    {
        private readonly IRequestByHrRepository _requestRepository;

        public CreateRequestCommandHandler(IRequestByHrRepository requestRepository)
        {
            _requestRepository = requestRepository;
        }

        public async Task<int> Handle(CreateRequestCommand request, CancellationToken cancellationToken)
        {
            var dto = request.RequestDto;
            return await _requestRepository.CreateRequestAsync(dto.ForEmpCode, dto.RequestByEmpCode, dto.Reason);
        }
    }
}
