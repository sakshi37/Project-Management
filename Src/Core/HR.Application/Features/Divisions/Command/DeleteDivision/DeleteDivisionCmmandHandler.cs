using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.DeleteCity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.DeleteDivision
{
     public class DeleteDivisionCmmandHandler : IRequestHandler<DeleteDivisionCommand ,bool>
    {
        private readonly IDivisionRepositry _repo;
        //private readonly IMapper _mapper;
        public DeleteDivisionCmmandHandler(IDivisionRepositry repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteDivisionCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.DivisionId, request.UpdatedBy);
            return true;
        }
    }
}
