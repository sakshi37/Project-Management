using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Designations.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Designations.Commands.UpdateDesignation
{
    public class UpdateDesignationCommandHandler : IRequestHandler<UpdateDesignationCommand, DesignationDto>
    {
        private readonly IDesignationRepository _repo;
        private readonly IMapper _mapper;

        public UpdateDesignationCommandHandler(IDesignationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<DesignationDto> Handle(UpdateDesignationCommand request, CancellationToken cancellationToken)
        {
            var updated = await _repo.UpdateAsync(request.Designation);
            return _mapper.Map<DesignationDto>(updated);
        }
    }
}
