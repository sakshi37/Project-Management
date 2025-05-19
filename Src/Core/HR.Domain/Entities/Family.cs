using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class Family
    {
        public string FamilyMemberTypeName { get; set; }
        public string FamilyMemberName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public string RelationWithEmployee { get; set; }
    
 }
}
