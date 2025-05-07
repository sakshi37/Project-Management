using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Locations.Commands.UpdateLocation
{
    public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommand, LocationDto>

    {
        readonly IMapper _mapper;
        readonly ILocationRepository _locationRepository;
        public UpdateLocationCommandHandler(ILocationRepository repo , IMapper Mapper)
        {
            _locationRepository = repo;
            _mapper = Mapper;
        }
        public async Task<LocationDto> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
        {
            var updated = await _locationRepository.UpdateAsync(request.Locaton);
            return _mapper.Map<LocationDto>(updated);
        }
    }
}
