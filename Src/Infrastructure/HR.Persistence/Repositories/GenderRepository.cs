using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Gender.Queries.GetAllGender;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class GenderRepository:IGenderRepository
    {
        private readonly AppDbContext _appDbContext;

        public GenderRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<GetAllGenderQueryVm>> GetAllAsync()
        {
            return await _appDbContext.GetAllGenderQueryVms.FromSqlRaw("EXEC SP_GetAllGender").ToListAsync();
        }
    }
}
