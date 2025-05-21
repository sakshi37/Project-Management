-- First, create/alter the procedure
ALTER PROCEDURE [dbo].[SP_CreateRequest]
    @ForEmpCode NVARCHAR(50),         
    @RequestByEmpCode NVARCHAR(50),   
    @Reason NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Fk_EmpId INT;
    DECLARE @RequestByEmpId INT;
    DECLARE @RequestByName NVARCHAR(100);
    DECLARE @EmployeeName NVARCHAR(100);

  SELECT @Fk_EmpId = Id,
       @EmployeeName = Name
FROM dbo.Tbl_Employee_master
WHERE Code = @ForEmpCode;

    SELECT @RequestByEmpId = Id,
           @RequestByName = Name
    FROM dbo.Tbl_Employee_master
    WHERE Code = @RequestByEmpCode;

    IF @Fk_EmpId IS NULL OR @RequestByEmpId IS NULL
    BEGIN
        RAISERROR('Invalid employee code(s).', 16, 1);
        RETURN;
    END

    INSERT INTO dbo.Tbl_RequestMaster (
        Fk_EmpId,
        RequestByEmpId,
        RequestByName,
        Reason,
        RequestStatus,
        RequestDate,
        ActionDate,
		EmployeeName
    )
    VALUES (
        @Fk_EmpId,
        @RequestByEmpId,
        @RequestByName,
        @Reason,
        'Pending',
        GETDATE(),
        NULL,
		@EmployeeName
    );
END;
GO

-- Then, execute the procedure
EXEC dbo.SP_CreateRequest
    @ForEmpCode = 'EMP00324',
    @RequestByEmpCode = 'EMP25455',
    @Reason = 'Returning from sabbatical';
