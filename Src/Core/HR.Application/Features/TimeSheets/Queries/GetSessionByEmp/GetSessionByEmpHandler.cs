using HR.Application.Contracts.Persistence;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.TimeSheets.Queries.GetSessionByEmp
{
    public class GetSessionByEmpHandler : IRequestHandler<GetSessionByEmpQuery, Attendance?>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        public GetSessionByEmpHandler(ITimeSheetRepository timeSheetRepository)
        {
            _timeSheetRepository = timeSheetRepository;
        }

        public async Task<Attendance?> Handle(GetSessionByEmpQuery request, CancellationToken cancellationToken)
        {
            var currentSession = await _timeSheetRepository.GetCurrentSession(request.EmpId);
            if (currentSession == null) return null;
            if (currentSession.EndDate == null) return currentSession;
            return null;

        }
    }
}
