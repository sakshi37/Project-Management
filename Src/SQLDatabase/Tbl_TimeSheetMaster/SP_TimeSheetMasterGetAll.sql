CREATE OR ALTER PROCEDURE SP_TimeSheetGetAll
AS
BEGIN
    SELECT 
        Id,
        StartDate,
        EndDate,
        Fk_EmployeeId as EmpId,
        Sequence,
        FK_JobId as JobId,
        TimeSheetStatus,
        CreatedBy,
        CreatedDate,
        UpdatedBy,
        UpdatedDate
    FROM Tbl_TimeSheetMaster
END
