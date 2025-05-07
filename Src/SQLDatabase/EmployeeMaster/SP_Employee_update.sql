Create or ALTER PROCEDURE [dbo].[SP_Employee_update]
    @Code varchar(50),
    @Address VARCHAR(250) = NULL,
    @MobileNo VARCHAR(20) = NULL,
    @SkypeId VARCHAR(20) = NULL,
    @JoinDate DATETIME2 = NULL,
    @Email VARCHAR(50) = NULL,
    @BccEmail VARCHAR(50) = NULL,
    @PanNumber VARCHAR(20) = NULL,
    @BirthDate DATETIME = NULL,
    @Image VARBINARY(MAX) = NULL,
    @Signature VARBINARY(MAX) = NULL,
    @LoginStatus BIT = NULL,
    @LeftCompany BIT = NULL,
    @LeftDate DATETIME2 = NULL,
    @Fk_LocationId INT = NULL,
    @Fk_DesignationId INT = NULL,
    @Fk_ShiftId INT = NULL,
    @Fk_EmployeeTypeId INT = NULL,
    @Fk_UserGroupId INT = NULL,
    @Fk_BranchId INT = NULL,
    @Fk_DivisionId INT = NULL
AS
BEGIN
    UPDATE Tbl_Employee_master
    SET
        Address = COALESCE(@Address, Address),
        MobileNo = COALESCE(@MobileNo, MobileNo),
        SkypeId = COALESCE(@SkypeId, SkypeId),
        JoinDate = COALESCE(@JoinDate, JoinDate),
        Email = COALESCE(@Email, Email),
        BccEmail = COALESCE(@BccEmail, BccEmail),
        PanNumber = COALESCE(@PanNumber, PanNumber),
        BirthDate = COALESCE(@BirthDate, BirthDate),
        Image = COALESCE(@Image, Image),
        Signature = COALESCE(@Signature, Signature),
        LoginStatus = COALESCE(@LoginStatus, LoginStatus),
        LeftCompany = COALESCE(@LeftCompany, LeftCompany),
        LeftDate = COALESCE(@LeftDate, LeftDate),
        Fk_LocationId = COALESCE(@Fk_LocationId, Fk_LocationId),
        Fk_DesignationId = COALESCE(@Fk_DesignationId, Fk_DesignationId),
        Fk_ShiftId = COALESCE(@Fk_ShiftId, Fk_ShiftId),
        Fk_EmployeeTypeId = COALESCE(@Fk_EmployeeTypeId, Fk_EmployeeTypeId),
        Fk_UserGroupId = COALESCE(@Fk_UserGroupId, Fk_UserGroupId),
        Fk_BranchId = COALESCE(@Fk_BranchId, Fk_BranchId),
        Fk_DivisionId = COALESCE(@Fk_DivisionId, Fk_DivisionId)
    WHERE Code = @Code;
END;



EXEC SP_Employee_update
    @Code = 'EMP00324',
    @MobileNo = '9999999910',
    @Email = 'sakshi@example.com',
    @Fk_BranchId = 3

	SELECT * FROM Tbl_Employee_master WHERE Code = 'EMP00324'
