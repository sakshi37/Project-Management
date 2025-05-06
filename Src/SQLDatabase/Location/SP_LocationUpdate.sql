drop  procedure  SP_LocationUpdate
go
create procedure  SP_LocationUpdate
	@LocationId int,
	@LocationName NVARCHAR(10),
	@LocationStatus bit,
	@UpdatedBy int

As
Begin
	update Tbl_LocationMaster
	set 
		LocationName = @LocationName,
        LocationStatus = @LocationStatus,
        UpdatedBy = @UpdatedBy,
        UpdatedDate = GETDATE()
    WHERE LocationId = @LocationId and LocationStatus=1;
		
SELECT 'Location Updated Successfully' AS Message;
END

