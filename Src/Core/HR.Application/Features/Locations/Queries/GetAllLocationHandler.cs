using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.Location.Query
{
    public class GetAllLocationHandler : IRequestHandler<GetAllLocationListQuery, IEnumerable<GetAllLocationDto>>
    {
        readonly IMapper _mapper;
        readonly ILocationMasterRepository _locationMasterRepository;

        public GetAllLocationHandler(IMapper mapper, ILocationMasterRepository locationMasterRepository)
        {
            _locationMasterRepository = locationMasterRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetAllLocationDto>> Handle(GetAllLocationListQuery request, CancellationToken cancellationToken)
        {
            var allLocation = await _locationMasterRepository.GetAllLocation();
            var location = _mapper.Map<List<GetAllLocationDto>>(allLocation);
            return location;
        }
    }
}
