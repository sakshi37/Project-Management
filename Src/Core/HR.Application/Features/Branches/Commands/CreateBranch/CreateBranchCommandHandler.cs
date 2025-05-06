using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.Branches.Commands.Dtos;
using HR.Application.Features.Cities.Commands.CreateCity;
using HR.Application.Features.Cities.Commands.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Branches.Commands.CreateBranch
{
    public class CreateBranchCommandHandler : IRequestHandler<CreateBranchCommand, BranchDto>
    {
        private readonly IBranchRepository _repo;
        private readonly IMapper _mapper;

        public CreateBranchCommandHandler(IBranchRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<BranchDto> Handle(CreateBranchCommand request, CancellationToken cancellationToken)
        {
            var branchEntity = await _repo.CreateAsync(request.Branch);
            return _mapper.Map<BranchDto>(branchEntity);
        }
    }

}
