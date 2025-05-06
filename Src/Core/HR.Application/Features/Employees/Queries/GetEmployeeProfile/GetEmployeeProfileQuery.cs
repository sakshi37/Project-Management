using HR.Application.Contracts.Models.Common;
using MediatR;
using System;

namespace HR.Application.Features.Employee.Queries.GetEmployeeProfile
{
    public class  GetEmployeeProfileQuery : IRequest<GetEmployeeProfileQueryVm>
    {
        //// Employee ID as a parameter
        //public int Id { get; set; }

        //// Constructor to initialize ID
        //public GetEmployeeProfileQuery(int id)
        //{
        //    Id = id;
        //}
        public String Code { get; set; }

        // Constructor to initialize ID
        public GetEmployeeProfileQuery(string code)
        {
            Code = code;
        }
    }
}

