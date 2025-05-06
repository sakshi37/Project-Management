CREATE OR ALTER PROCEDURE dbo.SP_HolidayUpdate
    @HolidayId INT,
    @HolidayName NVARCHAR(30),
    @HolidayDate DATE,
    @HolidayListType BIT,
    @HolidayStatus BIT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_HolidayMaster
    SET 
        HolidayName = @HolidayName,
        HolidayDate = @HolidayDate,
        HolidayListType = @HolidayListType,
        HolidayStatus = @HolidayStatus,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE HolidayId = @HolidayId;

    SELECT 'Holiday Updated Successfully' AS Message;
END;