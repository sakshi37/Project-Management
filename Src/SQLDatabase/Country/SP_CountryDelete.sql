using HrModule
Drop PROCEDURE SP_CountryDelete
CREATE PROCEDURE SP_CountryDelete
    @CountryId INT,
	@UpdatedBy int
    
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Tbl_CountryMaster

	SET CountryStatus = 0,
	UpdatedBy = @UpdatedBy,
	UpdatedDate = GetDate()
    
        
    WHERE CountryId = @CountryId;
	SELECT 'State Deleted Successfully' AS Message;
END


