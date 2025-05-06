create or alter procedure SP_TimeSheetGetAll

As
Begin 

 SELECT 
    t.Fk_EmployeeId as EmployeeId,
    t.Fk_JobId as JobId,
	t.CreatedBy,
	t.EndDate,
	t.StartDate,
	t.TimeSheetStatus
	
    
FROM 
    Tbl_TimeSheetMaster t

 end

