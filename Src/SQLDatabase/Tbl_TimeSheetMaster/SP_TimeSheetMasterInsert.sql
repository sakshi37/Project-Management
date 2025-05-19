CREATE PROCEDURE SP_TimeSheetInsert
		
		@FK_JobId int,
		@Sequence varchar(50),
		@Part varchar(50),
		@Activity varchar(50),
		@Type varchar(20),
		@StartTime DATETIME2,
		@EndTime DATETIME2,
		@Hrs int,
		@Min int,
		@Fk_EmployeeId INT,
		
		@TimeSheetStatus bit
		
AS
BEGIN
    INSERT INTO dbo.Tbl_TimeSheetMaster (
			FK_JobId ,
		Sequence ,
		Part ,
		Activity ,
		Type ,
		StartTime,
		EndTime ,
		Hrs ,
		Min ,
		Fk_EmployeeId ,
		TimeSheetStatus 
			
)

			VALUES (
			@FK_JobId ,
		@Sequence ,
		@Part ,
		@Activity ,
		@Type ,
		@StartTime,
		@EndTime ,
		@Hrs ,
		@Min ,
		@Fk_EmployeeId ,
		@TimeSheetStatus 
		)
End

