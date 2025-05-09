CREATE or alter PROCEDURE dbo.CheckCountryDuplicate
    @CountryName NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT CountryId ,CountryName, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, CountryStatus
    FROM Tbl_CountryMaster
    WHERE CountryName = @CountryName;
END;

EXEC dbo.CheckCountryDuplicate @CountryName='INDIA'
