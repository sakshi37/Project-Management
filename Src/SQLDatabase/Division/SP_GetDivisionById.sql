    
CREATE OR ALTER PROCEDURE SP_GetDivisionById
    @DivisionId INT
AS
BEGIN
    SELECT 
        D.DivisionId,
        D.DivisionName,
        D.ProjectManagerName,
        D.PrefixName,
        D.ManHours,
        D.DivisionStatus,

        D.Fk_HolidayId,
        H.HolidayName,
        H.HolidayListType,
        H.HolidayDate,

        D.CreatedBy,
        D.CreatedDate,
        D.UpdatedBy,
        D.UpdatedDate

    FROM Tbl_DivisionMaster D
    INNER JOIN Tbl_HolidayMaster H ON D.Fk_HolidayId = H.HolidayId
    WHERE D.DivisionId = @DivisionId AND D.DivisionStatus = 1;
END;
