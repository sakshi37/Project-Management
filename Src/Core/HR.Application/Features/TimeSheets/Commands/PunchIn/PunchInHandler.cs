using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn
{
    public class PunchInHandler : IRequestHandler<PunchInCommand>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        public PunchInHandler(ITimeSheetRepository timeSheetRepository)
        {

            _timeSheetRepository = timeSheetRepository;
        }
        public async Task Handle(PunchInCommand request, CancellationToken cancellationToken)
        {
            var attendance = await _timeSheetRepository.CheckOpenPunchIn(request.EmpId);
            var startDateTime = DateTime.Now;
            await _timeSheetRepository.punchIn(request.EmpId, startDateTime);
        }
    }
}
