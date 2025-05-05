EXEC SP_StateInsert 
    @Fk_CountryId = 1,                
    @StateName = 'Maharashtra',
    @StateCode = 'MH',
    @StateStatus = 1,
    @CreatedBy = 1;

EXEC SP_StateUpdate 
    @StateId = 2,                    
    @Fk_CountryId = 1,              
    @StateName = 'Gujarat',
    @StateCode = 'GJ',
    @StateStatus = 1,
    @UpdatedBy = 1;

EXEC SP_StateDelete 
    @StateId = 1,                    
    @UpdatedBy = 1;

EXEC SP_GetAllStates;

EXEC SP_GetStateById 
    @StateId = 1;



select * from Tbl_StateMaster