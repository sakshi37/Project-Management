using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn.Queries
{
    public class GetAllAttendnceCommandHandler : IRequestHandler<GetAllAttendanceListQuery, IEnumerable<GetAllAttendanceDto>>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        readonly IMapper _mapper;
        public GetAllAttendnceCommandHandler(ITimeSheetRepository timeSheetRepository, IMapper mapper)
        {

            _timeSheetRepository = timeSheetRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<GetAllAttendanceDto>> Handle(GetAllAttendanceListQuery request, CancellationToken cancellationToken)
        {
            var attendance = await _timeSheetRepository.GetAllAttendance();
            var allAttendance = _mapper.Map<List<GetAllAttendanceDto>>(attendance);
            return allAttendance;

        }
    }
}
