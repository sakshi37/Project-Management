create procedure dbo.SP_AttendanceEnd
@Fk_Emp int,
@EndDate DateTime2

As
Begin

insert into dbo.Tbl_AttendanceMaster(Fk_EmpId, EndDate)
values (@Fk_Emp, @EndDate)

end