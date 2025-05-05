CREATE OR ALTER PROCEDURE dbo.SP_CityInsert
    @Fk_StateId INT,
    @CityName NVARCHAR(100),
    @CreatedBy INT
AS
BEGIN
    INSERT INTO Tbl_CityMaster (
        Fk_StateId, CityName, CityStatus, CreatedBy, CreatedDate
    )
    VALUES (
        @Fk_StateId, @CityName, 1, @CreatedBy, GETDATE()
    );

    SELECT 'City Added Successfully' AS Message;
END;