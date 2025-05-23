ALTER PROCEDURE [dbo].[SP_EmployeeGetByEmail]
    @Email varchar(50)
AS
BEGIN
    SELECT 
        Id,
        Name,
        Code,
        Address,
        MobileNo,
        SkypeId,
        JoinDate,
        Email,
        BccEmail,
        PanNumber,
        BirthDate,
        Image,
        Signature,
        LoginStatus,
        LeftCompany,
        LeftDate,
        Fk_LocationId AS LocationId,      
        Fk_DesignationId AS DesignationId, 
        Fk_ShiftId AS ShiftId,            
        Fk_EmployeeTypeId AS EmployeeTypeId, 
        Fk_UserGroupId AS UserGroupId,    
        Fk_BranchId AS BranchId,         
        Fk_DivisionId AS DivisionId      
    FROM Tbl_Employee_master
    WHERE Email = @Email;
END
