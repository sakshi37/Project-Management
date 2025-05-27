using System;

using AutoMapper;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Dtos;
using HR.Application.Features.Employees.Dtos;
using MediatR;
using Microsoft.Extensions.Configuration;
namespace HR.Application.Features.LoginMaster.Query
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, employeesDto>
    {
        readonly ILoginService _loginService;
        readonly IMapper _mapper;
        readonly IConfiguration _configuration;
       
        public LoginQueryHandler(ILoginService loginService, IMapper mapper, IConfiguration configuration)
        {
            _loginService = loginService;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<employeesDto> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await _loginService.Login(request.loginRequest);
            var myuser = _mapper.Map<employeesDto>(user);
            return myuser;
        }
    }
}