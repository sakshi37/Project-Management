
CREATE  PROCEDURE SP_TimeSheetGetAll
AS
BEGIN
    SELECT 
        FK_JobId as JobId ,
		Sequence ,
		Part ,
		Activity ,
		Type ,
		StartTime,
		EndTime ,
		Hrs ,
		Min ,
		Fk_EmployeeId as EmpId ,
		TimeSheetStatus 
    FROM dbo.Tbl_TimeSheetMaster
END


EXEC SP_TimeSheetGetAll
