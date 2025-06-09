using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Contracts.Persistence;
using MediatR;

namespace HR.Application.Features.Admin.Commands.UpdateUserRole
{
    public class UpdateUserRoleCommandHandler :IRequestHandler<UpdateUserRoleCommand, string>
    {
        private readonly IAdminRepository _repo;
        private readonly IMapper _map;

        public UpdateUserRoleCommandHandler(IAdminRepository repo,IMapper map)
        {
            _repo = repo;
            _map = map;
            
        }

        public async Task<string> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var Update = await _repo.UpdateUserRole(request.Code ,request.Fk_UserGroupId);
                return Update;
        }
    }
}
