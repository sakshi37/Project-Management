using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Holidays.Commands.Dtos;
using MediatR;

namespace HR.Application.Features.Holidays.Commands.UpdateHoliday
{
    public record UpdateHolidayCommand(UpdateHolidayDto Holiday) : IRequest<HolidayDto>;

}
