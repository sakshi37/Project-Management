CREATE PROCEDURE [dbo].[SP_GetAllEmployeeType]
AS
BEGIN
    -- Select all employee types from the EmployeeTypeMaster table
    SELECT 
        EmployeeTypeId,
        EmployeeType
    FROM 
      Tbl_EmployeeTypeMaster;
END
 drop procedure  SP_GetAllEmployeeType
exec SP_GetAllEmployeeType;