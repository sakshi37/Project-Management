 EXEC SP_DesignationInsert 
    @DesignationName = 'ProjectManager',
    @DesignationStatus = 1,
    @CreatedBy = 1;

Exec SP_GetAllDesignations

Exec SP_GetDesignationById
	@DesignationId = 1;