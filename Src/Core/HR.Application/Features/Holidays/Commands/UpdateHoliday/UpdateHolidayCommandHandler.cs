using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Holidays.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Holidays.Commands.UpdateHoliday
{
    public class UpdateHolidayCommandHandler : IRequestHandler<UpdateHolidayCommand, HolidayDto>
    {
        private readonly IHolidayRepository _repo;
        private readonly IMapper _mapper;

        public UpdateHolidayCommandHandler(IHolidayRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<HolidayDto> Handle(UpdateHolidayCommand request, CancellationToken cancellationToken)
        {
            var updated = await _repo.UpdateAsync(request.Holiday);
            return _mapper.Map<HolidayDto>(updated);
        }
    }
}
