exec SP_BranchInsert
@Fk_CityId = 1,              
    @BranchName = 'Pimpri-Chinchwad',
    @BranchStatus = 1,
    @CreatedBy = 1;


EXEC SP_GetBranchById 
    @BranchId = 2;


EXEC SP_GetAllBranches;

Exec SP_BranchUpdate
     @BranchId= 1,
	 @Fk_CityId=1,
	 @BranchName='Hinjwadi',
	 @BranchStatus=1,
	 @UpdatedBy = 1;

Exec SP_BranchDelete
    @BranchId = 3,                   
    @UpdatedBy = 1;

select * from Tbl_BranchMaster;