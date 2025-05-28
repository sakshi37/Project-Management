ALTER PROCEDURE [dbo].[SP_InsertEmployeeDetails]
    @Code NVARCHAR(50),
    @Address NVARCHAR(MAX),
    @PanNumber NVARCHAR(50),
    @AadharCardNo NVARCHAR(50),
    @JoinDate DATE,
    @BirthDate DATE,
    @Email NVARCHAR(100),
    @EmergencyNo NVARCHAR(20),
    @Age INT,
	@Fk_GenderId Int
AS
BEGIN
    SET NOCOUNT ON;

    -- Update only if the employee with given Code exists
    IF EXISTS (
        SELECT 1 
        FROM [HR_Module].[dbo].[Tbl_Employee_master]
        WHERE [Code] = @Code
    )
    BEGIN
        -- Update existing employee
        UPDATE [HR_Module].[dbo].[Tbl_Employee_master]
        SET 
            [Address] = @Address,
            [PanNumber] = @PanNumber,
            [AadharCardNo] = @AadharCardNo,
            [JoinDate] = @JoinDate,
            [BirthDate] = @BirthDate,
            [Email] = @Email,
            [EmergencyNo] = @EmergencyNo,
            [Age] = @Age,
			[Fk_GenderId]=@Fk_GenderId
        WHERE [Code] = @Code;
    END
   
END;



EXEC dbo.SP_InsertEmployeeDetails
    @Code = 'EMP00324',
    @Address = '456 New Street, Mumbai',
    @PanNumber = 'BNZAA1234K',
    @AadharCardNo = '123456789012',
    @JoinDate = '2024-04-01',
    @BirthDate = '1992-08-15',
    @Email = 'emp1001@example.com',
    @EmergencyNo = '9876543210',
    @Age = 32,
	@Fk_GenderId=2;

	Select * from dbo.Tbl_Employee_master where Code='EMP00324'




	SELECT * FROM HR_Module.dbo.Tbl_GenderMaster WHERE GenderId = GenderId;
