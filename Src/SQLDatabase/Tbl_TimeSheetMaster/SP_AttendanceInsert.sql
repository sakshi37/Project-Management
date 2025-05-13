drop procedure dbo.SP_AttendanceInsert
create   procedure dbo.SP_AttendanceInsert
	
	@Fk_EmpId int,
	@StartDate DateTime2
	
AS
begin

	insert into dbo.Tbl_AttendanceMaster(Fk_EmpId, StartDate)
	values (@Fk_EmpId, @StartDate)

End

select * from dbo.Tbl_AttendanceMaster
