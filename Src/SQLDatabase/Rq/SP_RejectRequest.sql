alter PROCEDURE [dbo].[SP_RejectRequest]
    @RequestId INT,
    @EmpCode NVARCHAR(50)  -- Employee code of the person rejecting the request
AS
BEGIN
    SET NOCOUNT ON;

    -- Declare a variable to hold employeeId
    DECLARE @Id INT;

    -- Get EmployeeId from EmployeeMaster based on EmpCode
    SELECT @Id = Id
    FROM dbo.Tbl_Employee_master
    WHERE Code = @EmpCode;

    -- Update the request status, actionDate, and actionById
    UPDATE dbo.Tbl_RequestMaster
    SET RequestStatus = 'Reject',
        ActionDate = GETDATE(),
        ActionByEmpId = @Id
    WHERE RequestId = @RequestId;

    -- Return a message
    SELECT 'Request is Rejected' AS Message;
END;


exec SP_RejectRequest  @RequestId=2,@EmpCode='NS016'