using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public  class AccessRole
    {
        public int Id { get; set; }
        public bool ?IsRead { get; set; }
        public bool ?ApproveRequest { get; set; }
        public bool ?Active { get; set; }
        public bool ?Inactive { get; set; }
        public bool ?AssignedTask { get; set; }
        public bool ?EditTask { get; set; }
        public bool ?UpdateTask { get; set; }
        public bool ? Announcment { get; set; }
        public bool ?AddEmployee { get; set; }
        public bool? EditEmployee { get; set; }
        public int? Fk_UserGroupId { get; set; }
        public string? UserGroupName { get; set; }
    }
}
