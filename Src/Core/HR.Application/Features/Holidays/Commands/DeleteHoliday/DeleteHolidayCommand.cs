using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace HR.Application.Features.Holidays.Commands.DeleteHoliday
{
    public record DeleteHolidayCommand(int HolidayId, int UpdatedBy) : IRequest<bool>;

}
