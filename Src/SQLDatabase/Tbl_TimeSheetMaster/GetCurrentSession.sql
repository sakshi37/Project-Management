drop PROCEDURE dbo.SP_GetCurrentSession
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
    WHERE Fk_EmpId = @Fk_EmpId AND cast(StartDate as date) = CAST (GetDate() as date)
END
EXEC dbo.SP_GetCurrentSession @Fk_EmpId = 22;


select * from Tbl_AttendanceMaster

delete  from Tbl_AttendanceMaster