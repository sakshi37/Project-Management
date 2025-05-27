using HR.Application.Features.EmployeeType.Queries.GetAllEmployeeType;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface IEmployeeTypeRepository
    {
        Task<List<GetAllEmployeeTypeQueryVm>> GetAllAsync();
    }
}
