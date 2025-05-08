CREATE PROCEDURE SP_GetAllCountries
AS
BEGIN
    SELECT 
        C.CountryId,
        C.CountryName,
        C.CountryCode,
        C.CountryStatus

    FROM Tbl_CountryMaster C
    WHERE C.CountryStatus = 1;
END;

