namespace HR.API.Helper
{
    public static class PasswordGenerator
    {
        public static string GeneratePassword(string employeeName, string username)
        {
            // Get the first 4 letters of the employee name (ensure it's 4 or less)
            var namePart = employeeName.Length >= 4 ? employeeName.Substring(0, 4) : employeeName;

            // Get the last 3 digits of the username (ensure it's at least 3 characters)
            var usernamePart = username.Length >= 3 ? username.Substring(username.Length - 3) : username;

            // Combine to form the password
            return $"{namePart}@{usernamePart}";
        }
    }
}
