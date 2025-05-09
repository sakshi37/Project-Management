using HR.Application.Contracts.Models.Persistence;
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
    public class ShiftRepository : IShiftRepository
    {
        private readonly AppDbContext _appDbContext;

        public ShiftRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public  async Task<List<GetAllShiftsVm>> GetAllAsync()
        {
            return await _appDbContext.GetAllShiftsVms.FromSqlRaw("EXEC SP_GetAllShifts").ToListAsync();
        }
    }
}
