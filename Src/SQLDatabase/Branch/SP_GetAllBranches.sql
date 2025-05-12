CREATE OR ALTER PROCEDURE [dbo].SP_GetAllBranches
AS
BEGIN
    SELECT 
        B.BranchId,
        B.BranchName,
        B.BranchStatus,

        C.CityId,
        C.CityName,

        S.StateId,
        S.StateName,

        CO.CountryId,
        CO.CountryName

    FROM Tbl_BranchMaster B
    INNER JOIN Tbl_CityMaster C ON B.Fk_CityId = C.CityId
	Inner JOIN Tbl_StateMaster S ON C.Fk_StateId=S.StateId
    INNER JOIN Tbl_CountryMaster CO ON S.Fk_CountryId = CO.CountryId
    WHERE B.BranchStatus = 1;
END;
