using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Domain.Entities
{
    public class Tbl_Login
    {
        public int pk_LoginId { get; set; }
        public int fk_EmpId { get; set; }
        public string? UserName { get; set; }
        public byte[] Password { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool FirstLogin { get; set; }
        public string RoleName { get; set; }
    }
}
