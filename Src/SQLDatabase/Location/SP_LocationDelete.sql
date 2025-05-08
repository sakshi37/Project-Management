Create procedure SP_LocationDelete
	@LocationId int,
	@UpdatedBy int

As
Begin

UPDATE Tbl_LocationMaster
	set LocationStatus = 0,
	UpdatedBy = @UpdatedBy,
	UpdatedDate = GetDate()
	
	where LocationId = @LocationId 

	SELECT 'Location Deleted Successfully' AS Message;

end

	
		