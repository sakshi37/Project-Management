CREATE OR ALTER PROCEDURE [dbo].[SP_HolidayInsert]
    @HolidayName NVARCHAR(30),
    @HolidayDate DATE,
    @HolidayListType BIT,
    @CreatedBy INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the holiday already exists
    IF EXISTS (
        SELECT 1 
        FROM Tbl_HolidayMaster 
        WHERE HolidayName COLLATE SQL_Latin1_General_CP1_CI_AS = @HolidayName COLLATE SQL_Latin1_General_CP1_CI_AS
        AND HolidayDate = @HolidayDate
    )
    BEGIN
        -- Return message when holiday already exists
        SELECT 'Holiday already exists with the same name and date.' AS Message;
        RETURN;
    END

    -- Insert new holiday if no duplicates found
    INSERT INTO Tbl_HolidayMaster (
        HolidayName,
        HolidayDate,
        HolidayListType,
        HolidayStatus,
        CreatedBy,
        CreatedDate
    )
    VALUES (
        @HolidayName,
        @HolidayDate,
        @HolidayListType,
        1, -- Default status as active (1)
        @CreatedBy,
        GETDATE()
    );

    -- Return success message
    SELECT 'Holiday Inserted Successfully' AS Message;
END;
