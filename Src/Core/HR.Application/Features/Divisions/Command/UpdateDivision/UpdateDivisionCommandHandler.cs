

using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Divisions.Command.Dtos;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.Divisions.Command.UpdateDivision
{
   public class UpdateDivisionCommandHandler : IRequestHandler<UpdateDivisionCommand, division>
    {
        private readonly IDivisionRepositry _repo;
        private readonly IMapper _mapper;

        public UpdateDivisionCommandHandler(IDivisionRepositry repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<division> Handle(UpdateDivisionCommand request, CancellationToken cancellationToken)
        {
            var updated = await _repo.UpdateAsync(request.Division);
            return updated;
        }
    }

}
