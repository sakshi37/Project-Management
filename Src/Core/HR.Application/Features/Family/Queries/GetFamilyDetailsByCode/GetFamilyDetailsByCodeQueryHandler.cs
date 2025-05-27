using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using MediatR;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Queries.GetFamilyDetailsByCode
{
    public class GetFamilyDetailsByCodeQueryHandler : IRequestHandler<GetFamilyDetailsByCodeQuery, List<GetFamilyDetailsByCodeQueryVm>>
    {
        private readonly IFamilyRepository _repo;
        private readonly IMapper _mapper;

        public GetFamilyDetailsByCodeQueryHandler(IFamilyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        public async Task<List<GetFamilyDetailsByCodeQueryVm>> Handle(GetFamilyDetailsByCodeQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetFamilyDetailsAsync(request.Code);
        }


    }
}
