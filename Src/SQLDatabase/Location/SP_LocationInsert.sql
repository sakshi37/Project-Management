drop procedure SP_LocationInsert
Go
create procedure SP_LocationInsert

	@Fk_CityId int,
	@LocationName NVARCHAR(10),
	@LocationStatus bit,
	@CreatedBy int

As
Begin
	insert into Tbl_LocationMaster (Fk_CityId, LocationName,LocationStatus, CreatedBy, CreatedDate )
	values ( @Fk_CityId, @LocationName,@LocationStatus, @CreatedBy, GetDate());

	print 'Added Successfully';

End




