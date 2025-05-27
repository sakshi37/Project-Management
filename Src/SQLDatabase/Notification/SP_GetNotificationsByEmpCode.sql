ALTER PROCEDURE [dbo].[SP_GetNotificationsByEmpCode]
    @EmpCode NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if EmpCode exists
    IF NOT EXISTS (SELECT 1 FROM Tbl_Employee_master WHERE Code = @EmpCode)
    BEGIN
        RAISERROR('Employee code not found.', 16, 1);
        RETURN;
    END

    -- Get notifications
    SELECT 
	   N.NotificationId,
        N.Fk_EmpId,
        N.Subject,
        N.Message,
        N.IsRead,
        N.IsDeleted
    FROM Tbl_NotificationMaster N
    INNER JOIN Tbl_Employee_master E ON N.Fk_EmpId = E.Id
    WHERE E.Code = @EmpCode
      AND N.IsDeleted = 0
    ORDER BY N.NotificationId DESC;
END

exec SP_GetNotificationsByEmpCode @EmpCode='EMP25455'
SELECT * FROM Tbl_NotificationMaster WHERE NotificationId = 8 AND IsDeleted = 0;




ALTER TABLE dbo.Tbl_Employee_master
alter COLUMN Password NVARCHAR (Max);