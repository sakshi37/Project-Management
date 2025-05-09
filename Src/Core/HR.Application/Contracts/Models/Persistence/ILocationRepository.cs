using HR.Application.Features.Location.Query;

namespace HR.Application.Contracts.Persistence
{
    public interface ILocationMasterRepository
    {
        Task<List<GetAllLocationDto>> GetAllLocation();
    }
}
