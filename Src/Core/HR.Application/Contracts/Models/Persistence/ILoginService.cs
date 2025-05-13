using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Application.Contracts.Models;
using HR.Application.Dtos;

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

        Task InsertLoginAsync(int empId, int createdBy);

    }

}
