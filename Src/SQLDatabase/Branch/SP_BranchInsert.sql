CREATE OR ALTER PROCEDURE [dbo].SP_BranchInsert
    @Fk_CityId INT,
    @BranchName NVARCHAR(100),
    @BranchStatus BIT,
    @CreatedBy INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        INSERT INTO Tbl_BranchMaster (
            Fk_CityId, BranchName, BranchStatus, CreatedBy, CreatedDate
        )
        VALUES (
            @Fk_CityId, @BranchName, @BranchStatus, @CreatedBy, GETDATE()
        );

        COMMIT TRANSACTION;

        SELECT 'Branch Added Successfully' AS Message;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        -- Optional: return detailed error
        SELECT 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_MESSAGE() AS ErrorMessage;

        -- Or simply:
        -- THROW;
    END CATCH
END;
