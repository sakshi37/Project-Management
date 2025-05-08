EXEC SP_TimeSheetInsert  
    
			@StartDate = '2025-04-01 09:00:00' ,
			@EndDate = '2025-04-07 17:00:00' ,
			@Fk_EmployeeId = 1,
			@Sequence = 'login',
			@FK_JobId = 1 ,
			@TimeSheetStatus = 1 ,
			@CreatedBy =1 ,
			@CreatedDate = '2025-04-01 09:00:00' ,
			@UpdatedBy = 1,
			@UpdatedDate = '2025-04-07 17:00:00'

	select * from Tbl_TimeSheetMaster

	