CREATE OR ALTER PROCEDURE sp_EmployeeInsert
	
    @EmployeeName VARCHAR(100),
    @Fk_BranchId INT,
    @Address VARCHAR(250),
    @Mobile VARCHAR(20),
    @SkypeId VARCHAR(50),
    @CcEmail VARCHAR(100),
    @Fk_HeadDesignationId INT,
    @JoinDate DATE,
    @DutyHour TIME,
    @LeftCompany BIT = 0,
    @LeftDate DATE = NULL,
    @UserName VARCHAR(50),
    @Password VARCHAR(255),
    @AadharNumber VARCHAR(12),
    @EmployeeCode VARCHAR(20),
    @Fk_DesignationId INT,
    @Fk_DivisionId INT,
    @Fk_LocationId INT,
    @PinCode INT = NULL,
    @Email VARCHAR(100),
    @BccEmail VARCHAR(100),
    @PANNumber VARCHAR(10),
    @Fk_GenderId INT,
    @BirthDate DATE,
    @Fk_ShiftId INT,
    @Photo VARBINARY(MAX) = NULL,
    @Signature VARBINARY(MAX) = NULL,
    @Fk_EmployeeTypeId INT,
    @LoginStatus VARCHAR(10),
    @SignaturePath VARCHAR(255),
    @CreatedBy INT
AS
BEGIN
    INSERT INTO Tbl_EmployeeMaster (
        EmployeeName, Fk_BranchId, Address,
        Mobile, SkypeId, CcEmail,
        Fk_HeadDesignationId, JoinDate, DutyHour,
        LeftCompany, LeftDate,
        UserName, Password, AadharNumber, EmployeeCode,
        Fk_DesignationId, Fk_DivisionId, Fk_LocationId,
        PinCode, Email, BccEmail, PANNumber,
        Fk_GenderId, BirthDate, Fk_ShiftId,
        Photo, Signature, Fk_EmployeeTypeId,
        LoginStatus, SignaturePath,
        CreatedBy, CreatedDate
    )
    VALUES (
        @EmployeeName, @Fk_BranchId, @Address,
        @Mobile, @SkypeId, @CcEmail,
        @Fk_HeadDesignationId, @JoinDate, @DutyHour,
        @LeftCompany, @LeftDate,
        @UserName, @Password, @AadharNumber, @EmployeeCode,
        @Fk_DesignationId, @Fk_DivisionId, @Fk_LocationId,
        @PinCode, @Email, @BccEmail, @PANNumber,
        @Fk_GenderId, @BirthDate, @Fk_ShiftId,
        @Photo, @Signature, @Fk_EmployeeTypeId,
        @LoginStatus, @SignaturePath,
        @CreatedBy, GETDATE()
    );
END;

select * from Tbl_EmployeeMaster;