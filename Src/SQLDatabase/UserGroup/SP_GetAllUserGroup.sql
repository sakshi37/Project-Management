USE [HR_Module]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllUserGroup]    Script Date: 5/11/2025 2:36:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[SP_GetAllUserGroup]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT UserGroupId, UserGroupName,UserGroupStatus
    FROM dbo.Tbl_UserGroupMaster
	  WHERE 
        UserGroupStatus = 1;

END;

Exec SP_GetAllUserGroup;