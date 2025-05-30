
using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheet.Commands.UpdateTimeSheet
{
    public class UpdateTimeSheetHandler : IRequestHandler<UpdateTimeSheetCommand>
    {
        readonly IMapper _mapper;
        readonly ITimeSheetRepository _timeSheetRepository;

        public UpdateTimeSheetHandler(IMapper mapper, ITimeSheetRepository iTimeSheetRepository)
        {
            _mapper = mapper;
            _timeSheetRepository = iTimeSheetRepository;

        }


        public async Task Handle(UpdateTimeSheetCommand request, CancellationToken cancellationToken)
        {
            await _timeSheetRepository.UpdateTimeSheet(request.TimeSheet);
        }
    }
}
