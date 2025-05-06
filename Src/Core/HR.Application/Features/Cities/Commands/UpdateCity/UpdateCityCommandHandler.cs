using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using MediatR;

namespace HR.Application.Features.Cities.Commands.UpdateCity
{
    
    public class UpdateCityCommandHandler : IRequestHandler<UpdateCityCommand, CityDto>
    {
        private readonly ICityRepository _repo;
        private readonly IMapper _mapper;

        public UpdateCityCommandHandler(ICityRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<CityDto> Handle(UpdateCityCommand request, CancellationToken cancellationToken)
        {
            var updated = await _repo.UpdateAsync(request.City);
            return _mapper.Map<CityDto>(updated);
        }
    }
}
