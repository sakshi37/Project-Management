EXEC dbo.SP_HolidayInsert 
    @HolidayName = 'Republic Day',
    @HolidayDate = '2025-01-26',
    @Year = 2025,
    @HolidayStatus = 1,
    @CreatedBy = 1;

EXEC dbo.SP_HolidayUpdate 
    @HolidayId = 2,
    @HolidayName = 'Good Friday',
    @HolidayDate = '2025-04-18',
    @HolidayListType = 0,
    @Year = 2025,
    @HolidayStatus = 1,
    @UpdatedBy = 1;

EXEC usp_DeleteHoliday 
    @HolidayId = 1,
    @UpdatedBy = 1;

EXEC dbo.GetHolidays;

EXEC GetHolidays @HolidayListType = 1, @Year = 2025;