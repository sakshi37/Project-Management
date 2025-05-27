create PROCEDURE [dbo].[SP_ApproveRequest]
    @RequestId INT,
    @EmpCode NVARCHAR(50)  -- Approver's employee code
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ApproverId INT;
    DECLARE @TargetEmpId INT;

    -- Get approver's EmployeeId
    SELECT @ApproverId = Id
    FROM dbo.Tbl_Employee_master
    WHERE Code = @EmpCode;

    -- Get the target employee (the one being approved) from the request
    SELECT @TargetEmpId = Fk_EmpId
    FROM dbo.Tbl_RequestMaster
    WHERE RequestId = @RequestId;

    -- Approve the request
    UPDATE dbo.Tbl_RequestMaster
    SET RequestStatus = 'Approved',
        ActionDate = GETDATE(),
        ActionByEmpId = @ApproverId
    WHERE RequestId = @RequestId;

    -- Set the target employee as active in Employee Master
    UPDATE dbo.Tbl_Employee_master
    SET LoginStatus = 1
    WHERE Id = @TargetEmpId;

    -- Set the target employee as active in Login Master
    UPDATE dbo.Tbl_LoginMaster
    SET LoginStatus = 1
    WHERE Fk_EmpId = @TargetEmpId;

    -- Return success message
    SELECT 'Request is Approved' AS Message;
END;
