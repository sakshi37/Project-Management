
CREATE OR ALTER PROCEDURE SP_DesignationInsert
    @DesignationName NVARCHAR(75),
    @DesignationStatus BIT,
    @CreatedBy INT
AS
BEGIN
    INSERT INTO Tbl_DesignationMaster (
        DesignationName,
        DesignationStatus,
        CreatedBy, CreatedDate
    )
    VALUES (
        @DesignationName,
        @DesignationStatus,
        @CreatedBy, GETDATE()
    );

    SELECT 'Designation Added Successfully' AS Message;
END;
