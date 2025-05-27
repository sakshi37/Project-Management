
using HR.Application.Features.Gender.Queries.GetAllGender;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IGenderRepository
    {
        Task<List<GetAllGenderQueryVm>> GetAllAsync();

    }
}
