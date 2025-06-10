using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.AccesRole.Querry.GetAllAcessRole
{
    public  class GetAllAccessRoleQueryHandler : IRequestHandler<GetAllAccessRoleQuery, List<AccessRole>>
    { 
       readonly IAccessRoleRepositoy _accessRoleRepository; 
       //readonly IMapper _mapper;


        public GetAllAccessRoleQueryHandler(IAccessRoleRepositoy accessRoleRepository)
        {
             _accessRoleRepository = accessRoleRepository;
                //_mapper = mapper;   
        }
        public async Task<List<AccessRole>> Handle(GetAllAccessRoleQuery request, CancellationToken cancellationToken)
        {
          return await _accessRoleRepository.GetAllAsync();
        }
    }   
    
    
}
