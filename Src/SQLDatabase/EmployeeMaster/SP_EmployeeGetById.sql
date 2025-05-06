CREATE or alter PROCEDURE SP_EmployeeGetByEmail
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
        Fk_LocationId,
        Fk_DesignationId,
        Fk_ShiftId,
        Fk_EmployeeTypeId,
        Fk_UserGroupId,
        Fk_BranchId,
        Fk_DivisionId
    FROM Tbl_Employee_master
    WHERE Email = @Email;
END

EXEC SP_EmployeeGetByEmail @Email = 'vaishanvi.demo@gmail.com'

select * from Tbl_Employee_master
