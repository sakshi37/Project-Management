CREATE PROCEDURE [dbo].[SP_GetAllUserGroup]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT UserGroupId, UserGroupName,UserGroupStatus
    FROM dbo.Tbl_UserGroupMaster;

END;

drop procedure SP_GetAllUserGroup

exec SP_GetAllUserGroup

