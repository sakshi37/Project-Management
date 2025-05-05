CREATE OR ALTER PROCEDURE dbo.SP_HolidayDelete
    @HolidayId INT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_HolidayMaster
    SET 
        HolidayStatus = 0,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE HolidayId = @HolidayId;

    SELECT 'Holiday Deleted Successfully' AS Message;
END;