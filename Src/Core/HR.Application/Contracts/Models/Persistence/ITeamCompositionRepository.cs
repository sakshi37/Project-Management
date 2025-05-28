using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Holidays.Commands.Dtos;
using HR.Application.Features.TeamCompositions.Commands.CreateTeamComposition;
using HR.Application.Features.TeamCompositions.Commands.Dtos;
using HR.Application.Features.TeamCompositions.Commands.UpdateTeamComposition;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface ITeamCompositionRepository
    {
        Task<TeamComposition> CreateAsync(CreateTeamCompositionDto dto);
        //Task<List<TeamCompositionDto>> GetAllAsync();
        Task<List<TeamCompositionDto>> GetAllAsync(int? branchId = null, int? divisionId = null);
        Task<List<TeamLeaderDto>> GetTeamLeadersAsync();
        Task<TeamComposition> UpdateAsync(UpdateTeamCompositionDto team);




    }

}

