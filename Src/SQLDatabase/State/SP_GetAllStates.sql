CREATE or alter PROCEDURE dbo.SP_GetAllStates
AS
BEGIN
    SELECT 
        S.StateId,
        S.StateName,
        S.StateCode,
        S.StateStatus,
        C.CountryName,
		S.Fk_CountryId AS CountryId
    FROM Tbl_StateMaster S
    INNER JOIN Tbl_CountryMaster C ON S.Fk_CountryId = C.CountryId
    WHERE S.StateStatus = 1;
END;

exec dbo.SP_GetAllStates
