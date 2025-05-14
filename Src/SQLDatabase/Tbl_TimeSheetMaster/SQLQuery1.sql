CREATE PROCEDURE dbo.SP_GetCurrentSession
    @Fk_EmpId INT
AS
BEGIN
    SELECT 
        Id,
        Fk_EmpId,
        StartDate,
        EndDate
    FROM Tbl_AttendanceMaster
    WHERE Fk_EmpId = @Fk_EmpId AND EndDate IS NULL
END
EXEC sp_helptext 'dbo.SP_CheckOpenPunchIn';


select * from Tbl_AttendanceMaster