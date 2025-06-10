using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Domain.Entities;
using MediatR;

namespace HR.Application.Features.AccesRole.Querry.GetAllAcessRole
{
    public record  GetAllAccessRoleQuery : IRequest <List<AccessRole>>;
    
}
