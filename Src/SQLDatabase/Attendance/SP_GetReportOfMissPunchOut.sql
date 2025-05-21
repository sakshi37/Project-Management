ALTER PROCEDURE [dbo].[SP_GetReportOfMissPunchOut]
    @StartDate DATE
AS
BEGIN
    SELECT 
        E.Code,
        E.Name,
        D.DepartmentName,
        A.StartDate,
        A.EndDate
    FROM Tbl_AttendanceMaster A
    INNER JOIN Tbl_Employee_master E ON A.Fk_EmpId = E.Id
    INNER JOIN Tbl_DepartmentMaster D ON E.Fk_DepartmentId = D.DepartmentId
    WHERE A.EndDate IS NULL
      AND CAST(A.StartDate AS DATE) = @StartDate
END;



