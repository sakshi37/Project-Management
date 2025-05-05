using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Countries.Commands.CreateCountry;
using HR.Application.Features.Countries.Commands.Dtos;
using HR.Application.Features.Countries.Commands.UpdateCountry;
using HR.Application.Features.States.Commands.CreateState;
using HR.Application.Features.States.Commands.Dtos;
using HR.Application.Features.States.Commands.UpdateState;
using HR.Application.Features.States.Queries.GetAllStates;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IStateRepository
    {


        Task<State> CreateAsync(CreateStateDto dto);
        Task<State> UpdateAsync(UpdateStateDto dto);
        Task DeleteAsync(int id, int updatedBy);
        Task<List<StateDto>> GetAllAsync();
    }

}
