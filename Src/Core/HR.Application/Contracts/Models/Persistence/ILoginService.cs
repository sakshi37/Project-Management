using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models;
using HR.Application.Dtos;
using HR.Application.Features.Employees.Dtos;
using HR.Domain.Entities;

namespace HR.Application.Contracts.Models.Persistence
{
    public interface ILoginService
    {
        Task<LoginResponse> Login(Tbl_LoginMasterDto loginRequest);
        Task<OtpResponse> VerifyOtp(OtpRequest otpRequest);
        public void StoreOtp(string UserName, string otp);
        Task<bool> SendChangePasswordOtp(string username);
        Task<bool> ChangePassword(ChangePassword changePasswordRequest);

        Task<bool> UpdatePassword(UpdatePasswordRequest updatePasswordRequest);

        Task<empdetailDto> GetByIdAsync(int id);
        Task InsertLogAsync(string empCode, byte[] password);


    }

}
