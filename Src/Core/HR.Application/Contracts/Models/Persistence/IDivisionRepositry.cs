    using HR.Application.Features.Designations.Commands.CreateDesignation;
using HR.Application.Features.Designations.Commands.Dtos;
using HR.Application.Features.Designations.Commands.UpdateDesignation;
using HR.Application.Features.Divisions.Command.CreateLocationCommand;
using HR.Application.Features.Divisions.Command.UpdateDivision;
using HR.Application.Features.Divisions.Query.GetAllQuery;
using HR.Application.Features.Divisions.Query.GetProjectManager;
using HR.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IDivisionRepositry
    {
        Task<division> CreateAsync(CreateDivisionDto dto);

        //Task<Division> CreateAsync(CreateDesignationDto dto);
        Task<division> UpdateAsync(UpdateDivisionDto dto);
        Task DeleteAsync(int id, int updatedBy);
        Task<List<GetAllDivisionDto>> GetAllAsync();
        //Task<DivisionDto> GetByIdAsync(int id);
        Task<List<GetAllProjectManagerDto>> GetAllPMAsync();
    }
}
