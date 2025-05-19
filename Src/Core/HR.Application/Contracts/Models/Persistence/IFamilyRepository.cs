using HR.Application.Features.Family.Commands.AddFamilyDetails;
using HR.Application.Features.Family.Queries.GetAllFamilyType;
using HR.Application.Features.Family.Queries.GetFamilyDetailsByCode;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public  interface IFamilyRepository
    {
        Task<bool> AddFamilyMemberAsync(AddFamilyDetailsCommandDto dto);
        Task<List<GetAllFamilyMemberTypeQueryVm>> GetAllAsync();
        Task<List<GetFamilyDetailsByCodeQueryVm>> GetFamilyDetailsAsync(string code);

    }
}
