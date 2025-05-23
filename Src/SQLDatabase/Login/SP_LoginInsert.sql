USE [HrModule]
GO
/****** Object:  StoredProcedure [remote].[SP_InsertLoginForEmployee]    Script Date: 5/9/2025 12:25:26 PM ******/
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

    -- Get employee details including role
    SELECT 
        @UserName = E.Code,
        @Email = E.Email,
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
        RoleName
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
        @RoleName
    );
END


EXEC [remote].[SP_InsertLoginForEmployee]
    @EmpId = 33,
    @Password = 'Tejas@11',
    @CreatedBy = 1;

