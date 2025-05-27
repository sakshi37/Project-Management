using HR.Application.Contracts.Models.Persistence;
using HR.Domain.Entities;
using HR.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Persistence.Repositories
{
    public class DepartmenRepositoryt : IDepartmentRepository
    {
        AppDbContext _context;
        public DepartmenRepositoryt(AppDbContext context)
        {
            _context = context;

        }

        public async Task<List<Department>> GetAllAsync()
        {
        return  await _context.Department.FromSqlRaw("Exec dbo.SP_GetAllDepartment").ToListAsync();
        }
    }
    
}
