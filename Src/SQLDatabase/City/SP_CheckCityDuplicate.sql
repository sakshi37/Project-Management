CREATE or alter PROCEDURE dbo.CheckCityDuplicate
    @CityName NVARCHAR(100),
    @StateId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT CityId, Fk_StateId as StateId, CityName, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, CityStatus
    FROM Tbl_CityMaster
    WHERE CityName = @CityName AND Fk_StateId = @StateId;
END;

EXEC dbo.CheckCityDuplicate @CityName='Bombay', @StateId=1
