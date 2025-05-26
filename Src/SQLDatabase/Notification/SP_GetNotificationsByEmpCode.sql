CREATE PROCEDURE [dbo].[SP_GetNotificationsByEmpCode]
    @EmpCode NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT N.NotificationId,
           N.Fk_EmpId,
           E.Code,
           N.Subject,
           N.Message,
           N.IsRead,
           N.IsDeleted
    FROM Tbl_NotificationMaster N
    INNER JOIN Tbl_Employee_master E ON N.Fk_EmpId = E.Id
    WHERE E.Code = @EmpCode
      AND N.IsDeleted = 0 -- Only active notifications
    ORDER BY N.NotificationId DESC;
END;
