﻿using HR.Application.Contracts.Persistence;
using HR.Application.Exception;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.PunchOut
{
    public class PunchOutCommandHandler : IRequestHandler<PunchOutCommand>
    {
        readonly ITimeSheetRepository _timeSheetRepository;
        public PunchOutCommandHandler(ITimeSheetRepository timeSheetRepository)
        {

            _timeSheetRepository = timeSheetRepository;
        }

        public async Task Handle(PunchOutCommand request, CancellationToken cancellationToken)
        {
            var attendance = await _timeSheetRepository.GetCurrentSession(request.EmpId);
            if (attendance == null)
            {

                throw new PunchInValidationException("You have already punch-out");
            }
            var endDateTime = DateTime.UtcNow;
            await _timeSheetRepository.PunchOut(request.EmpId, endDateTime);
        }
    }
}
