using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Family.Queries.GetFamilyDetailsByCode
{
    public class GetFamilyDetailsByCodeQueryVm
    {
        public string FamilyMemberTypeName { get; set; }
        public string FamilyMemberName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public String RelationWithEmployee { get; set; }


    }
}
