Alter PROCEDURE [dbo].[SP_GetFamilyMemberTypes]
    @Status VARCHAR(20) = NULL  -- Optional: e.g., 'Active', 'Inactive'
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [FamilyMemberTypeId] ,
        [FamilyMemberTypeName] 
      
    FROM 
        [dbo].[FamilyMemberTypeMaster]
    
END;
exec SP_GetFamilyMemberTypes;