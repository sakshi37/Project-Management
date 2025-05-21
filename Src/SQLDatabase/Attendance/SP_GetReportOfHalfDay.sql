CREATE PROCEDURE [dbo].[SP_GetReportOfHalfDay]
    @StartDate DATE
AS
BEGIN
    SELECT 
        E.Code,
        E.Name,
        D.DepartmentName,
        A.StartDate,
        A.EndDate,
        CAST(DATEDIFF(MINUTE, A.StartDate, A.EndDate) / 60.0 AS DECIMAL(5,2)) AS TotalHours
    FROM Tbl_AttendanceMaster A
    INNER JOIN Tbl_Employee_master E ON A.Fk_EmpId = E.Id
    INNER JOIN Tbl_DepartmentMaster D ON E.Fk_DepartmentId = D.DepartmentId
    WHERE 
        A.StartDate IS NOT NULL AND 
        A.EndDate IS NOT NULL AND
        CAST(A.StartDate AS DATE) = @StartDate AND
        DATEDIFF(MINUTE, A.StartDate, A.EndDate) BETWEEN 1 AND 420 -- 7 hours = 420 minutes
END


exec SP_GetReportOfHalfDay @StartDate='2025-05-18'
