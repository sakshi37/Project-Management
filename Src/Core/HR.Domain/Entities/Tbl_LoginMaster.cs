

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace HR.Domain.Entities
{
    public class Tbl_LoginMaster
    {
        [Key]
        public int pk_LoginId { get; set; }
        public int fk_EmpId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public string Email {  get; set; }
        public bool FirstLogin { get; set; }
       public string RoleName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime UserCheckInTime { get; set; }





    }
}
