using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Commands.AddFamilyDetails
{
   
    public record AddFamilyDetailsCommand(AddFamilyDetailsCommandDto FamilyMemberDto) : IRequest<bool>;

}
