using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.Designations.Commands.CreateDesignation;
using HR.Application.Features.Designations.Commands.Dtos;
using HR.Application.Features.Designations.Commands.UpdateDesignation;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IDesignationRepository
    {

        Task<Designation> CreateAsync(CreateDesignationDto dto);
        Task<Designation> UpdateAsync(UpdateDesignationDto dto);
        Task DeleteAsync(int id, int updatedBy);
        Task<List<DesignationDto>> GetAllAsync();
        Task<DesignationDto> GetByIdAsync(int id);
    }
}
