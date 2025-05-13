
using HR.Application.Features.Locations.Commands.CreateLocation;
using HR.Application.Features.Locations.Commands.UpdateLoation;
using HR.Application.Features.Locations.Dtos;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Persistence
{
    public interface ILocationRepository
    {
        Task<Location> CreateAsync(CreateLocationDto dto);
        Task<Location> UpdateAsync(UpdateLocationDto dto);
        Task DeleteAsync(int id, int UpdatedBy);
        Task<List<LocationDto>> GetAllAsync();
        //Task<LocationDto> GetByIdAsync(int id);
        //Task<List<GetAllLocationDto>> GetAllLocation();
    }
}   
