using HR.Application.Features.Branches.Commands.CreateBranch;
using HR.Application.Features.Branches.Commands.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IBranchRepository
    {
        Task<BranchDto> CreateAsync(CreateBranchDto dto);
        //Task<City> UpdateAsync(UpdateBanchDto dto);
        Task DeleteAsync(int id, int updatedBy);
        Task<List<BranchDto>> GetAllAsync();
    }
}
