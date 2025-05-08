CREATE or alter PROCEDURE SP_TimeSheetInsert

		@StartDate DATETIME2,
		@EndDate DATETIME2,
		@Fk_EmployeeId INT,
		@Sequence varchar(50),
		@FK_JobId int,
		@TimeSheetStatus bit,
		@CreatedBy INT,
		@CreatedDate Datetime2,
		@UpdatedBy int,
		@UpdatedDate DateTime2
AS
BEGIN
    INSERT INTO Tbl_TimeSheetMaster (
			StartDate ,
			EndDate ,
			Fk_EmployeeId,
			Sequence,
			FK_JobId ,
			TimeSheetStatus ,
			CreatedBy ,
			CreatedDATE,
			UpdatedBy ,
			UpdatedDate
)

			VALUES (
			@StartDate ,
			@EndDate ,
			@Fk_EmployeeId,
			@Sequence,
			@FK_JobId ,
			@TimeSheetStatus ,
			@CreatedBy ,
			@CreatedDate,
			@UpdatedBy ,
			@UpdatedDate
		)
End

