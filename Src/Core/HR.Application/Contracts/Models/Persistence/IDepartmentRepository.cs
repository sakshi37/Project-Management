using HR.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
     public interface IDepartmentRepository
    {
         Task<List<Department>> GetAllAsync();
        //Task<Department>
    }
}
