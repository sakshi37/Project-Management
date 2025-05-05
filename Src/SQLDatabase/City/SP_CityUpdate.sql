CREATE OR ALTER PROCEDURE dbo.SP_CityUpdate
    @CityId INT,
    @Fk_StateId INT,
    @CityName NVARCHAR(100),
    @CityStatus BIT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_CityMaster
    SET 
        Fk_StateId = @Fk_StateId,
        CityName = @CityName,
        CityStatus = @CityStatus,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE CityId = @CityId;

    SELECT 'City Updated Successfully' AS Message;
END;