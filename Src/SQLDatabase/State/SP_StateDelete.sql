CREATE or Alter PROCEDURE dbo.SP_StateDelete
    @StateId INT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_StateMaster
    SET 
        StateStatus = 0,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE StateId = @StateId;

    SELECT 'State Deleted Successfully' AS Message;
END;