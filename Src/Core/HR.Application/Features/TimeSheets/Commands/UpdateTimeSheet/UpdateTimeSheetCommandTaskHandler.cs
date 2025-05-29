
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheets.Commands.UpdateTimeSheet
{
    //using HR.Application.Contracts.Persistence;
    using MediatR;
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    namespace HR.Application.Features.TimeSheets.Commands.UpdateTimeSheet
    {
        public class UpdateTimeSheetCommandTaskHandler : IRequestHandler<UpdateTimeSheetCommandTask, bool>
        {
            private readonly ITimeSheetRepository _timeSheetRepository;

            public UpdateTimeSheetCommandTaskHandler(ITimeSheetRepository timeSheetRepository)
            {
                _timeSheetRepository = timeSheetRepository;
            }

            public async Task<bool> Handle(UpdateTimeSheetCommandTask request, CancellationToken cancellationToken)
            {
                var result = await _timeSheetRepository.UpdateTimeSheetMaster(request.timeSheetDto);
                return result;
            }
        }
    }

}
