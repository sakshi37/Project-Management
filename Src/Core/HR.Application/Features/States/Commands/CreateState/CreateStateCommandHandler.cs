using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.States.Commands.Dtos;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.States.Commands.CreateState
{
    public class CreateStateCommandHandler : IRequestHandler<CreateStateCommand, StateDto>
    {
        private readonly IStateRepository _repo;
        private readonly IMapper _mapper;

        public CreateStateCommandHandler(IStateRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<StateDto> Handle(CreateStateCommand request, CancellationToken cancellationToken)
        {
            var state = await _repo.CreateAsync(request.State);
            return _mapper.Map<StateDto>(state);
        }
    }
}