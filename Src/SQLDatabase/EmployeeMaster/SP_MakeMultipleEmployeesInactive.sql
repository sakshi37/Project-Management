CREATE PROCEDURE [dbo].[SP_MakeMultipleEmployeesInactive]
    @Codes VARCHAR(MAX)  -- e.g., 'EMP001,EMP002,EMP003'
AS
BEGIN
    -- Declare a table variable to hold the split employee codes
    DECLARE @EmployeeList TABLE (Code VARCHAR(50));

    -- Insert split values into the table variable
    INSERT INTO @EmployeeList (Code)
    SELECT LTRIM(RTRIM(Value))
    FROM dbo.fn_SplitString(@Codes, ',')
    WHERE Value IS NOT NULL AND LTRIM(RTRIM(Value)) <> '';

    -- Check if any employee is already inactive - if yes, stop execution
    IF EXISTS (
        SELECT 1
        FROM dbo.Tbl_Employee_master EM
        INNER JOIN @EmployeeList EL ON EM.Code = EL.Code
        WHERE EM.LoginStatus = 0
    )
    BEGIN
        RAISERROR('One or more employees are already inactive. Only active employees can be inactivated.', 16, 1);
        RETURN;
    END

    -- Update only active employees in Tbl_Employee_master
    UPDATE EM
    SET EM.LoginStatus = 0
    FROM dbo.Tbl_Employee_master EM
    INNER JOIN @EmployeeList EL ON EM.Code = EL.Code
    WHERE EM.LoginStatus = 1;

    -- Update only active users in Tbl_LoginMaster
    UPDATE LM
    SET LM.LoginStatus = 0
    FROM dbo.Tbl_LoginMaster LM
    INNER JOIN @EmployeeList EL ON LM.UserName = EL.Code
    WHERE LM.LoginStatus = 1;

    -- Final response
    SELECT 'Employee(s) in the provided list have been successfully inactivated.' AS Message;
END;


drop procedure SP_MakeMultipleEmployeesInactive

EXEC dbo.SP_MakeMultipleEmployeesInactive @Codes = 'EMP25850,EMP25784,EMP25476';
SELECT Code FROM dbo.Tbl_Employee_master WHERE Code IN ('EMP25850','EMP25784','EMP25476');

