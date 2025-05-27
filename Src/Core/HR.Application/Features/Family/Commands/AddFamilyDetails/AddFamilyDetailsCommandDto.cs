using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Commands.AddFamilyDetails
{
    public record AddFamilyDetailsCommandDto(
    int Fk_FamilyMemberTypeId,
    string EmployeeCode,
    string FamilyMemberName,
    DateTime BirthDate,
    int Age,
    string RelationWithEmployee,
    bool FamilyStatus
);

}
