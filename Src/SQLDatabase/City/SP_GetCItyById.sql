CREATE OR ALTER PROCEDURE SP_GetCityById
    @CityId INT
AS
BEGIN
    SELECT 
        C.CityId,
        C.CityName,
        C.CityStatus,

        S.StateId,
        S.StateName,

        CO.CountryId,
        CO.CountryName

    FROM Tbl_CityMaster C
    INNER JOIN Tbl_StateMaster S ON C.Fk_StateId = S.StateId
    INNER JOIN Tbl_CountryMaster CO ON S.Fk_CountryId = CO.CountryId
    WHERE C.CityId = @CityId AND C.CityStatus = 1;
END;
