ALTER TABLE Tbl_Employee_master
ADD [Delete] BIT NOT NULL DEFAULT 0;


ALTER TABLE Tbl_Employee_master
drop column [Delete]


USE [HR_Module]
GO
/****** Object:  StoredProcedure [dbo].[SP_MakeEmployeeActive]    Script Date: 6/6/2025 11:13:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[SP_DeleteEmployee]
    @Code VARCHAR(20)
AS
BEGIN
    UPDATE dbo.Tbl_Employee_master
    SET [Delete] = 1,
	UpdatedDate = GETDATE()
    WHERE Code = @Code;



    SELECT 'Employee is Deleted  Successfully' AS Message;
END;
Exec SP_DeleteEmployee @Code='EMP00324'