using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn.Commands
{
    public class PunchInCommandHandler : IRequestHandler<PunchInCommand>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        public PunchInCommandHandler(ITimeSheetRepository timeSheetRepository)
        {

            _timeSheetRepository = timeSheetRepository;
        }
        public async Task Handle(PunchInCommand request, CancellationToken cancellationToken)
        {
            var attendance = await _timeSheetRepository.GetCurrentSession(request.EmpId);
            if (attendance != null)
            {

                //
                await _timeSheetRepository.UpdateCurrentSession(request.EmpId);
                return;

            }

            var startDateTime = DateTime.Now;
            await _timeSheetRepository.PunchIn(request.EmpId, startDateTime);
        }




    }
}
