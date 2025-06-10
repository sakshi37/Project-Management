using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Features.AccesRole.Command.CreateAccessRole;
using HR.Domain.Entities;


using MediatR;

namespace HR.Application.Features.AccesRole.Command.CreateAccessRole
{
    public record CreateAcessRoleCommand(CreateAcessRoleCommandDto dto) : IRequest<bool>;
    
}
