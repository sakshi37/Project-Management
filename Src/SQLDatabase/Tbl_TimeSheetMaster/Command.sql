EXEC SP_TimeSheetInsert  
    @StartDate = '2025-04-01 09:00:00',  
    @EndDate = '2025-04-07 17:00:00',  
    @Fk_EmployeeId = 1,       -- Replace with an actual employee ID  
    @FK_JobId = 101,          -- Replace with an actual job ID  
    @CreatedBy = 1,           -- Replace with the ID of the user who is inserting  
    @TimeSheetStatus = 1;     -- 1 for Active, 0 for Inactive
