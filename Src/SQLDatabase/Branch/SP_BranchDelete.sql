CREATE OR ALTER PROCEDURE [dbo].SP_BranchDelete
    @BranchId INT,
    @UpdatedBy INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Tbl_BranchMaster
        SET 
            BranchStatus = 0,
            UpdatedBy = @UpdatedBy,
            UpdatedDate = GETDATE()
        WHERE BranchId = @BranchId;

        COMMIT TRANSACTION;

        SELECT 'Branch Deleted Successfully' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT 
            ERROR_MESSAGE() AS ErrorMessage,
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState,
            ERROR_LINE() AS ErrorLine,
            ERROR_PROCEDURE() AS ErrorProcedure;
    END CATCH
END;
