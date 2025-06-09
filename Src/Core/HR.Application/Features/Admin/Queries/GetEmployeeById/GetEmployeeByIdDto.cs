using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Admin.Queries.GetEmployeeById
{
    public class GetEmployeeByIdDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Email { get; set; }
        public int? UserGroupId { get; set; }
        public string? UserGroupName { get; set; }
    }
}
