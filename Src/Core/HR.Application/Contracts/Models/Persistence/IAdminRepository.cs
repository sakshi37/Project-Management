using HR.Application.Features.Admin.Queries.GetPendingRequest;


namespace HR.Application.Contracts.Models.Persistence
{
    public interface IAdminRepository
    {
        Task<List<PendingRequestVm>> GetPendingRequestAsync();
        Task<string> RejectRequestAsync(int requestId, string empCode);

    }
}
