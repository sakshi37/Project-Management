using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Features.AccesRole.Command.CreateAccessRole;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.AccesRole.Command.InsertAccessRole
{
    public class CreateAcessRoleCommandHandler : IRequestHandler<CreateAcessRoleCommand , bool>
    {
        private readonly IAccessRoleRepositoy _repo;
        private readonly IMapper _map;

        public CreateAcessRoleCommandHandler(IAccessRoleRepositoy repo , IMapper map)
        {
            _repo = repo;
            _map = map;

        }

        public async Task<bool> Handle(CreateAcessRoleCommand request, CancellationToken cancellationToken)
        {
            var result = await _repo.CreateAccesRole(request.dto);
            return result;
        }
    }
}
