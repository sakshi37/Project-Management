using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.EmployeeType.Queries.GetAllEmployeeType;
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
    public class EmployeeTypeRepository : IEmployeeTypeRepository
    {
        private readonly AppDbContext _appDbContext;

        public EmployeeTypeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<GetAllEmployeeTypeQueryVm>> GetAllAsync()
        {
            return await _appDbContext.GetAllEmployeeTypeQueryVms.FromSqlRaw("EXEC SP_GetAllEmployeeType").ToListAsync();
        }
    }
}
