using AutoMapper;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.TimeSheet.Commands.CreateTimeSheet
{
    public class CreateTimeSheetHandler : IRequestHandler<CreateTimeSheetCommand, CreateTimeSheetDto>
    {
        readonly IMapper _mapper;
        readonly ITimeSheetRepository _timeSheetRepository;

        public CreateTimeSheetHandler(IMapper mapper, ITimeSheetRepository iTimeSheetRepository)
        {
            _mapper = mapper;
            _timeSheetRepository = iTimeSheetRepository;

        }



        public async Task<CreateTimeSheetDto> Handle(CreateTimeSheetCommand request, CancellationToken cancellationToken)
        {
            var timesheet = await _timeSheetRepository.AddTimeSheet(request.TimeSheet);
            return _mapper.Map<CreateTimeSheetDto>(timesheet);
        }
    }
}
