CREATE or Alter PROCEDURE dbo.SP_StateUpdate
    @StateId INT,
    @Fk_CountryId INT,
    @StateName NVARCHAR(100),
    @StateCode CHAR(3),
    @StateStatus BIT,
    @UpdatedBy INT
AS
BEGIN
    UPDATE Tbl_StateMaster
    SET 
        Fk_CountryId = @Fk_CountryId,
        StateName = @StateName,
        StateCode = @StateCode,
        StateStatus = @StateStatus,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE StateId = @StateId;

    SELECT 'State Updated Successfully' AS Message;
END;
SELECT * FROM dbo.Tbl_CountryMaster