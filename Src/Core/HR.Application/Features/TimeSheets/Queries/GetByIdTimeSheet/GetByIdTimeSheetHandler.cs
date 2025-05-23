using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetByIdTimeSheet
{
    public class GetByIdTimeSheetHandler : IRequestHandler<GetByIdTimeSheetQuery, List<GetByIdTimeSheetDto>>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        public GetByIdTimeSheetHandler(ITimeSheetRepository timeSheetRepository)
        {
            _timeSheetRepository = timeSheetRepository;

        }

        public async Task<List<GetByIdTimeSheetDto>> Handle(GetByIdTimeSheetQuery request, CancellationToken cancellationToken)
        {
            return await _timeSheetRepository.TimeSheetGetById(request.empId);
        }


    }
}
