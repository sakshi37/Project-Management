create procedure dbo.SP_AttendanceUpdate
@Fk_EmpId int,
@EndDate DateTime2

As
Begin

update dbo.Tbl_AttendanceMaster

	set EndDate = @EndDate
	where Fk_EmpId = @Fk_EmpId and EndDate is null

end

select * from Tbl_AttendanceMaster