using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Cities.Queries.GetAllCities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Shifts.Queries.GetAllShiftsQuery
{
    public  class GetAllShiftQueryHandler: IRequestHandler<GetAllShiftsQuery, List<GetAllShiftsVm>>
    {
        private readonly IShiftRepository _repo;
        public GetAllShiftQueryHandler(IShiftRepository repo) 
        {
            _repo = repo;
        }
         public async Task<List<GetAllShiftsVm>> Handle(GetAllShiftsQuery  request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }



    }
}
