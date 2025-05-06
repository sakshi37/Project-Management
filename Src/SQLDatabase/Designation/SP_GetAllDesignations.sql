CREATE OR ALTER PROCEDURE dbo.SP_GetAllDesignations
AS
BEGIN
    SELECT 
        D.DesignationId,
        D.DesignationName,
        D.DesignationStatus,
        D.CreatedBy,
        D.CreatedDate,
        D.UpdatedBy,
        D.UpdatedDate

    FROM Tbl_DesignationMaster D
    WHERE D.DesignationStatus = 1;
END;