alter PROCEDURE [dbo].[SP_GetAllPendingRequest]
AS
BEGIN
    SELECT 
	   R.RequestId,
	    R.RequestDate,
        R.EmployeeName,
        R.RequestByName,
		R.Reason,
      
        'Approve/Reject' AS Action
    FROM Tbl_RequestMaster R
	where R.RequestStatus='pending'
	end;

	exec SP_GetAllPendingRequest