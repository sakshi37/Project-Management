USE [HR_Module]
GO
/****** Object:  StoredProcedure [remote].[SP_InsertLoginForEmployee]    Script Date: 5/12/2025 3:30:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [remote].[SP_InsertLoginForEmployee]
    @EmpId INT,
    @Password VARCHAR(20),
    @CreatedBy INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserName VARCHAR(20);
    DECLARE @Email VARCHAR(100);
    DECLARE @RoleName NVARCHAR(50);
	DEclare @LoginStatus BIT ;

    -- Get employee details including role
    SELECT 
        @UserName = E.Code,
        @Email = E.Email,
		@LoginStatus=E.LoginStatus,
        @RoleName = U.UserGroupName
    FROM [dbo].[Tbl_Employee_master] E
    LEFT JOIN [dbo].[Tbl_UserGroupMaster] U ON E.Fk_UserGroupId = U.UserGroupId
    WHERE E.Id = @EmpId;

    -- Insert into LoginMaster
    INSERT INTO [dbo].[Tbl_LoginMaster] (
        fk_EmpId,
        UserName,
        Password,
        pk_LoginId,
        CreatedBy,
        CreatedDate,
        Email,
        FirstLogin,
        RoleName,
		LoginStatus
    )
    VALUES (
        @EmpId,
        @UserName,
        @Password,
        (SELECT ISNULL(MAX(pk_LoginId), 0) + 1 FROM Tbl_LoginMaster),
        @CreatedBy,
        GETDATE(),
        @Email,
        1,
        @RoleName,
		@LoginStatus
    );
END
exec remote.SP_InsertLoginForEmployee @EmpId=23,@Password='Sumit@123',@CreatedBy=1