using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.States.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.States.Commands.UpdateState
{
    public class UpdateStateCommandHandler : IRequestHandler<UpdateStateCommand, StateDto>
    {
        private readonly IStateRepository _repo;
        private readonly IMapper _mapper;

        public UpdateStateCommandHandler(IStateRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<StateDto> Handle(UpdateStateCommand request, CancellationToken cancellationToken)
        {
            var updated = await _repo.UpdateAsync(request.State);
            return _mapper.Map<StateDto>(updated);
        }
    }
}
