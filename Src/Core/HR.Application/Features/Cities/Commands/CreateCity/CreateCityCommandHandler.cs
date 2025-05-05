using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Cities.Commands.CreateCity
{
    
    public class CreateCityCommandHandler : IRequestHandler<CreateCityCommand, CityDto>
    {
        private readonly ICityRepository _repo;
        private readonly IMapper _mapper;

        public CreateCityCommandHandler(ICityRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<CityDto> Handle(CreateCityCommand request, CancellationToken cancellationToken)
        {
            var city = await _repo.CreateAsync(request.City);
            return _mapper.Map<CityDto>(city);
        }
    }
}
