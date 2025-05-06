using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Queries.GetAllCountries;
using HR.Application.Features.Holidays.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Holidays.Queries.GetAllHolidays
{
    public class GetAllHolidaysQueryHandler : IRequestHandler<GetAllHolidaysQuery, List<HolidayDto>>
    {
        private readonly IHolidayRepository _repo;

        public GetAllHolidaysQueryHandler(IHolidayRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<HolidayDto>> Handle(GetAllHolidaysQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }

}
