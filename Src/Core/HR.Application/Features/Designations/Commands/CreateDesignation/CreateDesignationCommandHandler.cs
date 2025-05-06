using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Designations.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Designations.Commands.CreateDesignation
{
    public class CreateDesignationCommandHandler : IRequestHandler<CreateDesignationCommand, DesignationDto>
    {
        private readonly IDesignationRepository _repo;
        private readonly IMapper _mapper;

        public CreateDesignationCommandHandler(IDesignationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<DesignationDto> Handle(CreateDesignationCommand request, CancellationToken cancellationToken)
        {
            var designation = await _repo.CreateAsync(request.Designation);
            return _mapper.Map<DesignationDto>(designation);
        }
    }
}
