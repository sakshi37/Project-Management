using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Cities.Commands.CreateCity;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Commands.UpdateCity;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface ICityRepository
    {
        Task<City> CreateAsync(CreateCityDto dto);
        Task<City> UpdateAsync(UpdateCityDto dto);
        Task DeleteAsync(int id, int updatedBy);
        Task<List<CityDto>> GetAllAsync();
    }
}
