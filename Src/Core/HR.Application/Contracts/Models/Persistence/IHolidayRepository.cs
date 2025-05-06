using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.Holidays.Commands.CreateHoliday;
using HR.Application.Features.Holidays.Commands.Dtos;
using HR.Application.Features.Holidays.Commands.UpdateHoliday;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IHolidayRepository
    {
        Task<Holiday> CreateAsync(CreateHolidayDto dto);
        Task<Holiday> UpdateAsync(UpdateHolidayDto dto);
        Task DeleteAsync(int id, int updatedBy);
        Task<List<HolidayDto>> GetAllAsync();
    }
}
