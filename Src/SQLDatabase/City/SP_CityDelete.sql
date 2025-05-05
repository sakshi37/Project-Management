CREATE OR ALTER PROCEDURE dbo.SP_CityDelete
    @CityId INT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_CityMaster
    SET 
        CityStatus = 0,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE CityId = @CityId;

    SELECT 'City Deleted Successfully' AS Message;
END;