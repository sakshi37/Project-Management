using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Dtos;
using HR.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.CreateLocation
{
    public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, LocationDto>
    {
         readonly IMapper _mapper;
        readonly ILocationRepository _repo;

        public CreateLocationCommandHandler(ILocationRepository repo , IMapper mapper)
        {
             _mapper=mapper;
            _repo=repo;
            
        }
        public async Task<LocationDto> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
        {
            var create = await _repo.CreateAsync(request.Location);
                return _mapper.Map<LocationDto>(create);

        }
    }
}
