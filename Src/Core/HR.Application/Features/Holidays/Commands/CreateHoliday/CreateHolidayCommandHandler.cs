using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Holidays.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Holidays.Commands.CreateHoliday
{
    public class CreateHolidayCommandHandler : IRequestHandler<CreateHolidayCommand, HolidayDto>
    {
        private readonly IHolidayRepository _repo;
        private readonly IMapper _mapper;

        public CreateHolidayCommandHandler(IHolidayRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<HolidayDto> Handle(CreateHolidayCommand request, CancellationToken cancellationToken)
        {
            var holiday = await _repo.CreateAsync(request.Holiday);
            return _mapper.Map<HolidayDto>(holiday);
        }
    }
}
