
CREATE OR ALTER PROCEDURE SP_DivisionDelete
    @DivisionId INT,
    @UpdatedBy NVARCHAR(50)
AS
BEGIN
    UPDATE Tbl_DivisionMaster
    SET 
        DivisionStatus = 0,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE DivisionId = @DivisionId;

    SELECT 'Division Deleted Successfully' AS Message;
END;
