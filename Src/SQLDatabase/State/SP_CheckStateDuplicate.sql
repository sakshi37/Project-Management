CREATE or alter PROCEDURE dbo.SP_CheckStateDuplicate
    @StateName NVARCHAR(100),
    @CountryId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT StateId, Fk_CountryId as CountryId, StateName, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, StateStatus
    FROM Tbl_StateMaster
    WHERE StateName = @StateName AND Fk_CountryId = @CountryId;
END;

EXEC dbo.CheckCityDuplicate @CityName='Bombay', @StateId=1
