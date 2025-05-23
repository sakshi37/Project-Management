
using HR.Application.Contracts.Models;
using HR.Application.Dtos;
using HR.Application.Features.Employees.Dtos;
using MediatR;

namespace HR.Application.Features.LoginMaster.Query
{
    public record LoginQuery(Tbl_LoginMasterDto loginRequest) : IRequest<employeesDto>;

}