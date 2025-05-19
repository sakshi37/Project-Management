CREATE PROCEDURE dbo.SP_GetEmployeeImageByCode
    @Code VARCHAR(50)  -- match the length of your Code column
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Image
    FROM dbo.Tbl_Employee_master
    WHERE Code = @Code;
END