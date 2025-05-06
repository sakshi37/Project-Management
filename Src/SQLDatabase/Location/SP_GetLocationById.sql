DROP PROCEDURE IF EXISTS SP_GetLocationById;
GO

CREATE PROCEDURE SP_GetLocationById
    @LocationId INT
AS 
BEGIN
    SELECT
        L.LocationId,
        L.LocationName,
        L.LocationStatus,
        C.CityId,
        C.CityName
    FROM Tbl_LocationMaster L
    INNER JOIN Tbl_CityMaster C ON L.Fk_CityId = C.CityId
    WHERE L.LocationId = @LocationId AND L.LocationStatus = 1;
END
