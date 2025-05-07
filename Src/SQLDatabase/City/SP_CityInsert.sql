

CREATE OR ALTER PROCEDURE [dbo].[SP_CityInsert]
    @Fk_StateId INT,
    @CityName NVARCHAR(100),
    @CreatedBy INT
AS
BEGIN
    -- Check if the city already exists in the same state (case-insensitive)
    IF EXISTS (
        SELECT 1 
        FROM Tbl_CityMaster 
        WHERE CityName COLLATE SQL_Latin1_General_CP1_CI_AS = @CityName COLLATE SQL_Latin1_General_CP1_CI_AS
        AND Fk_StateId = @Fk_StateId
    )
    BEGIN
        -- Return a message indicating the city already exists
        SELECT 'City already exists in this state' AS Message;
        RETURN;
    END
    
    -- If no duplicate found, insert the new city
    INSERT INTO Tbl_CityMaster (
        Fk_StateId, CityName, CityStatus, CreatedBy, CreatedDate
    )
    VALUES (
        @Fk_StateId, @CityName, 1, @CreatedBy, GETDATE()
    );
    
    SELECT 'City Added Successfully' AS Message;
END;

