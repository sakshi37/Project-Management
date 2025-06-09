
using MediatR;

namespace HR.Application.Features.Admin.Commands.UpdateUserRole
{
    public  record UpdateUserRoleCommand(string Code,int Fk_UserGroupId) :IRequest<string>;
    
    
}
