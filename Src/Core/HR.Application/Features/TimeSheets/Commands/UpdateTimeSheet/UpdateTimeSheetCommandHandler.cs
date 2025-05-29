using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public class UpdateTimeSheetCommandHandler : IRequestHandler<UpdateTimeSheetCommand,bool>
        {
            private readonly ITimeSheetRepository _timeSheetRepository;

            public UpdateTimeSheetCommandHandler(ITimeSheetRepository timeSheetRepository)
            {
                _timeSheetRepository = timeSheetRepository;
            }

            public async Task<bool> Handle(UpdateTimeSheetCommand request, CancellationToken cancellationToken)
            {
                var result = await _timeSheetRepository.UpdateTimeSheetMaster(request.timeSheetDto);
                return result;
            }
        }
    }

}
