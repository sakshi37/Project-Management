CREATE PROCEDURE dbo.SP_GetStateById
    @StateId INT
AS
BEGIN
    SELECT 
        S.StateId,
        S.StateName,
        S.StateCode,
        S.StateStatus,
        S.Fk_CountryId,
        C.CountryName
    FROM Tbl_StateMaster S
    INNER JOIN Tbl_CountryMaster C ON S.Fk_CountryId = C.CountryId
    WHERE S.StateId = @StateId AND S.StateStatus = 1;
END;