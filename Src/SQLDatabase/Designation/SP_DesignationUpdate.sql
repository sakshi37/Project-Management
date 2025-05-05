
CREATE OR ALTER PROCEDURE dbo.SP_DesignationUpdate
    @DesignationId INT,
    @DesignationName NVARCHAR(75),
    @DesignationStatus BIT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_DesignationMaster
    SET 
        DesignationName = @DesignationName,
        DesignationStatus = @DesignationStatus,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE DesignationId = @DesignationId;

    SELECT 'Division Updated Successfully' AS Message;
END;

Exec Rahul.SP_GetAllDesignations