using HR.Application.Features.Dtos;
using HR.Application.Features.Locations.Commands.CreateLocation;
using HR.Application.Features.Locations.Commands.UpdateLocation;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
   public interface ILocationRepository
    {
        Task<Location> CreateAsync(CreateLocationDto dto);
        Task<Location> UpdateAsync(UpdateLocationDto dto);
        Task DeleteAsync(int id, int UpdatedBy);
        Task<List<LocationDto>> GetAllAsync();
        //Task<LocationDto> GetByIdAsync(int id);
    }
}
