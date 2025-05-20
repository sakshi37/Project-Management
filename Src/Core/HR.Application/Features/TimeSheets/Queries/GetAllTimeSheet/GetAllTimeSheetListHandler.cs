using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetAllTimeSheet
{
    public class GetAllTimeSheetListHandler : IRequestHandler<GetAllTimeSheetListQuery, IEnumerable<GetAllTimeSheetListDto>>
    {
        readonly IMapper _mapper;
        readonly ITimeSheetRepository _timeSheetRepository;

        public GetAllTimeSheetListHandler(IMapper mapper, ITimeSheetRepository timeSheetRepository)
        {

            _mapper = mapper;
            _timeSheetRepository = timeSheetRepository;

        }



        //public async Task<IEnumerable<GetAllTimeSheetListDto>> IRequestHandler<GetAllTimeSheetListQuery, IEnumerable<GetAllTimeSheetListDto>>.Handle(GetAllTimeSheetListQuery request, CancellationToken cancellationToken)
        //{
        //    var timeSheet = await _timeSheetRepository.GetAllTimeSheetList();
        //    var allTimeSheet = _mapper.Map<List<GetAllTimeSheetListQuery>>(timeSheet);
        //    return allTimeSheet;
        //}

        public async Task<IEnumerable<GetAllTimeSheetListDto>> Handle(GetAllTimeSheetListQuery request, CancellationToken cancellationToken)
        {
            var timeSheet = await _timeSheetRepository.GetAllTimeSheetList();
            var allTimeSheet = _mapper.Map<List<GetAllTimeSheetListDto>>(timeSheet);
            return allTimeSheet;
        }
    }
}
