using HR.Application.Features.Employee.Dtos;
using MediatR;

namespace HR.Application.Features.Employees.Queries
{
    public record GetEmployeeByEmailQuery(string email) : IRequest<EmployeeDto>
    {
        //public string Email { get; set; }
    }
}
