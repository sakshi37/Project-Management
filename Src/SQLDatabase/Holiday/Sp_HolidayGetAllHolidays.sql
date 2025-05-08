CREATE or alter PROCEDURE dbo.SP_GetHolidays
    @HolidayListType NVARCHAR(50) = NULL,
    @Year INT = NULL
AS
BEGIN
    SELECT HolidayId, HolidayName, HolidayDate, HolidayListType, Year, HolidayStatus
    FROM Tbl_HolidayMaster
    WHERE HolidayStatus = 1
    AND (@HolidayListType IS NULL OR HolidayListType = @HolidayListType)
    AND (@Year IS NULL OR Year = @Year)
    ORDER BY HolidayDate;
END