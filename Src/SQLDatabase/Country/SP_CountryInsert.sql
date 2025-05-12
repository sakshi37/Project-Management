drop PROCEDURE SP_CountryInsert
Go

CREATE PROCEDURE SP_CountryInsert
    @CountryName NVARCHAR(100),
    @CountryCode char(3),
    @CreatedBy int
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Tbl_CountryMaster (CountryName, CountryCode, CountryStatus, CreatedBy, CreatedDate)
    VALUES (@CountryName, @CountryCode, 1, @CreatedBy, GETDATE());

END
