using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Shifts.Queries.GetAllShiftsQuery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Contracts.Models.Persistence
{
    public  interface IShiftRepository
    {
        Task<List<GetAllShiftsVm>> GetAllAsync();
    }
}
