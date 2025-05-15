using HR.Application.Contracts.Persistence;
using HR.Application.Exception;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchIn
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
                Console.WriteLine($"Employee  has already punched in at: {attendance.StartDate}");
                throw new PunchInValidationException($"Employee has already punched in:{attendance.StartDate}");

            }
            var startDateTime = DateTime.Now;
            await _timeSheetRepository.PunchIn(request.EmpId, startDateTime);
        }




    }
}
