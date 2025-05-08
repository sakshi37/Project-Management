use HrModule
 drop  PROCEDURE SP_CountryUpdate

 Go 

CREATE PROCEDURE SP_CountryUpdate
    @CountryId INT,
    @CountryName NVARCHAR(100),
    @CountryCode NVARCHAR(20),
    @CountryStatus BIT,
    @UpdatedBy int
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Tbl_CountryMaster
    SET CountryName = @CountryName,
        CountryCode = @CountryCode,
        CountryStatus = @CountryStatus,
        UpdatedBy =		@UpdatedBy,
        UpdatedDate = GETDATE()
       
    WHERE CountryId = @CountryId;
END
