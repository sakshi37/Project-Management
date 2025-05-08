CREATE or alter PROCEDURE SP_TimeSheetInsert

    @StartDate DATETIME2,
    @EndDate DATETIME2,
    @Fk_EmployeeId INT,
	@FK_JobId int,
    @CreatedBy INT,
	@TimeSheetStatus bit
AS
BEGIN
    INSERT INTO Tbl_TimeSheetMaster (
        StartDate,
        EndDate,
        Fk_EmployeeId,
		Fk_JobId,
		TimeSheetStatus,
        CreatedBy,
        CreatedDate
		
    )
    VALUES (
        @StartDate,
        @EndDate,
        @Fk_EmployeeId,
		@Fk_JobId,
		@TimeSheetStatus,
        @CreatedBy,
        GETDATE()
		)
End

select * from TimeSheets