using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Cities.Commands.CreateCity;
using HR.Application.Features.Cities.Commands.Dtos;
using HR.Application.Features.Divisions.Command.Dtos;
using HR.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Divisions.Command.CreateDivision
{
    public class CreateDivisionCommandHandler : IRequestHandler<CreateDivisionCommand, division>
    {
        private readonly IDivisionRepositry _repo;
        private readonly IMapper _mapper;

        public CreateDivisionCommandHandler(IDivisionRepositry repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async  Task<division> Handle(CreateDivisionCommand request, CancellationToken cancellationToken)
        {
            var division = await _repo.CreateAsync(request.Division);
            return division;
        }
    }
}

