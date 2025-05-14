using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Queries
{
    public class GetSessionByEmpHandler : IRequestHandler<GetSessionByEmpQuery>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        public GetSessionByEmpHandler(ITimeSheetRepository timeSheetRepository)
        {
            _timeSheetRepository = timeSheetRepository;
        }

        public async Task Handle(GetSessionByEmpQuery request, CancellationToken cancellationToken)
        {
            await _timeSheetRepository.GetCurrentSession(request.EmpId);

        }
    }
}
