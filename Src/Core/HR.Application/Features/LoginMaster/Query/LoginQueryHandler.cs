using System;

using AutoMapper;
using HR.Application.Contracts.Models;
using HR.Application.Contracts.Models.Persistence;
using HR.Application.Dtos;
using MediatR;

namespace HR.Application.Features.LoginMaster.Query
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, Tbl_LoginMasterDto>
    {
        readonly ILoginService _loginService;
        readonly IMapper _mapper;

        public LoginQueryHandler(ILoginService loginService, IMapper mapper)
        {
            _loginService = loginService;
            _mapper = mapper;
        }
        public async Task<Tbl_LoginMasterDto> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await _loginService.Login(request.loginRequest);
            var myuser = _mapper.Map<Tbl_LoginMasterDto>(user);
            return myuser;
        }
    }
}