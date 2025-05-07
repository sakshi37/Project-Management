DROP PROCEDURE IF EXISTS [dbo].[SP_GetAllFamilyMembers];
Go

CREATE PROCEDURE [dbo].[SP_GetAllFamilyMembers]
AS
BEGIN
    -- Select all family members with their type name
    SELECT 
         fmt.FamilyMemberTypeName,
        fm.FamilyMemberName,
        fm.BirthDate,
        fm.Age,
        fm.RelationWithEmployee
        
       
    FROM 
        dbo.Tbl_FamilyMaster fm
    JOIN 
        dbo.FamilyMemberTypeMaster fmt
        ON fm.Fk_FamilyMemberTypeId = fmt.FamilyMemberTypeId
    ORDER BY 
        fm.FamilyId DESC;  -- Optionally you can change the order, this orders by the most recent family member first.
END;
GO


exec dbo.SP_GetAllFamilyMembers