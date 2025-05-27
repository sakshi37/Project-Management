ALTER PROCEDURE [dbo].[SP_ReadandDelNotification]
    @NotificationId INT
AS
BEGIN


    UPDATE dbo.Tbl_NotificationMaster
    SET 
        IsRead = 1,
        IsDeleted = 1
    WHERE NotificationId = @NotificationId;

    IF @@ROWCOUNT = 0
    BEGIN
        SELECT 0 AS Success, 'NotificationId not found.' AS Message;
        RETURN;
    END

    SELECT 1 AS Success, 'Notification Deleted' AS Message;
END;


exec dbo.SP_ReadandDelNotification @NotificationId=8	