CREATE PROCEDURE SP_EmployeeGetById
    @Id INT
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
        Fk_LocationId,
        Fk_DesignationId,
        Fk_ShiftId,
        Fk_EmployeeTypeId,
        Fk_UserGroupId,
        Fk_BranchId,
        Fk_DivisionId
    FROM Tbl_Employee_master
    WHERE Id = @Id;
END

EXEC SP_EmployeeGetById @Id = 1;
