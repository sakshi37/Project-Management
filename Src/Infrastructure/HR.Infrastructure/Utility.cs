namespace HR.Infrastructure
{
    public static class Utility
    {
        public static byte[] ConvertBase64ToByteArray(string base64)
        {
            if (string.IsNullOrEmpty(base64))
            {
                return null;
            }

            return Convert.FromBase64String(base64);
        }
    }

}
