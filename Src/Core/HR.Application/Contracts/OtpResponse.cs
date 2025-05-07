
namespace HR.Application.Contracts.Models
{
    public class OtpResponse
    {
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int Otp { get; set; }
        public DateTime OtpExpiryTime { get; set; }
    }
}