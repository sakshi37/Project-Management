using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface ITeamCompositionRepository
    {
        Task<TeamComposition> CreateAsync(CreateTeamCompositionDto dto);
        //Task<List<TeamCompositionDto>> GetAllAsync();
        //Task<List<TeamCompositionDto>> GetAllAsync(int? branchId = null, int? divisionId = null);


    }

}
