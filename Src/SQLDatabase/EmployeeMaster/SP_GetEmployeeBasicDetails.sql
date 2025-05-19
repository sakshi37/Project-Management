create PROCEDURE [dbo].[SP_GetEmployeeBasicDetailsByCode]
    @Code VARCHAR(50)
AS
BEGIN
    SELECT 
        E.Name ,
        E.Code ,
        D.DesignationName 
    FROM dbo.Tbl_Employee_master E
    LEFT JOIN dbo.Tbl_DesignationMaster D ON E.Fk_DesignationId = D.DesignationId
    WHERE E.Code = @Code;
END;

exec SP_GetEmployeeBasicDetailsByCode @code=EMP25455