    
CREATE OR ALTER PROCEDURE SP_GetDesignationById
    @DesignationId INT
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
    WHERE D.DesignationId = @DesignationId AND D.DesignationStatus = 1;
END;
