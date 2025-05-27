CREATE PROCEDURE [dbo].[SP_InsertNotification]
    @Fk_EmpId INT,
    @Subject NVARCHAR(255),
    @Message NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Optional: Validate if employee exists
    IF EXISTS (SELECT 1 FROM Tbl_Employee_master WHERE Id = @Fk_EmpId)
    BEGIN
        INSERT INTO Tbl_NotificationMaster (
            Fk_EmpId,
            Subject,
            Message,
            IsRead,
            IsDeleted
        )
        VALUES (
            @Fk_EmpId,
            @Subject,
            @Message,
            0,          -- IsRead = false
            0           -- IsDeleted = false
        );
    END
    ELSE
    BEGIN
        RAISERROR('Employee with ID %d not found.', 16, 1, @Fk_EmpId);
    END
END;
