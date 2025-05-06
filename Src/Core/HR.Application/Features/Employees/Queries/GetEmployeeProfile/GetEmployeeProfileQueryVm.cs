using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Application.Features.Employee.Queries.GetEmployeeProfile
{
    public class GetEmployeeProfileQueryVm
    {
        public byte[]? Image { get; set; }  // Profile image as byte array
        public string? Name { get; set; }   // Employee name
        public string? DesignationName { get; set; }
    }
}
