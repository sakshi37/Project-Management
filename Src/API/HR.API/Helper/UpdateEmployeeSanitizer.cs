using HR.Application.Features.Employees.Commands.UpdateEmployee;

namespace HR.API.Helper
{
    public class UpdateEmployeeSanitizer
    {

        public static void Clean(UpdateEmployeeCommandDto dto)
        {
            if (dto == null) return;

            dto.Code = CleanString(dto.Code);
            dto.Address = CleanString(dto.Address);
            dto.MobileNo = CleanString(dto.MobileNo);
            dto.SkypeId = CleanString(dto.SkypeId);
            dto.Email = CleanString(dto.Email);
            dto.BccEmail = CleanString(dto.BccEmail);
            dto.PanNumber = CleanString(dto.PanNumber);
            dto.Image = CleanString(dto.Image);
            dto.Signature = CleanString(dto.Signature);

            // If 0 is invalid for IDs, convert 0 to null
            dto.LocationId = dto.LocationId == 0 ? null : dto.LocationId;
            dto.DesignationId = dto.DesignationId == 0 ? null : dto.DesignationId;
            dto.ShiftId = dto.ShiftId == 0 ? null : dto.ShiftId;
            dto.EmployeeTypeId = dto.EmployeeTypeId == 0 ? null : dto.EmployeeTypeId;
            dto.UserGroupId = dto.UserGroupId == 0 ? null : dto.UserGroupId;
            dto.BranchId = dto.BranchId == 0 ? null : dto.BranchId;
            dto.DivisionId = dto.DivisionId == 0 ? null : dto.DivisionId;
            dto.CountryId = dto.CountryId == 0 ? null : dto.CountryId;
            dto.StateId=dto.StateId==0 ? null : dto.StateId;
            dto.CityId=dto.CityId == 0 ? null :dto.CityId;
            dto.GenderId=dto.GenderId==0 ? null : dto.GenderId;
        }

        private static string? CleanString(string? value)
        {
            return string.IsNullOrWhiteSpace(value) || value == "string" ? null : value;
        }
    }

}
