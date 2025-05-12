drop table dbo.Tbl_AttendanceMaster
create table dbo.Tbl_AttendanceMaster(
	
	Id int identity(1,1),
	Fk_EmpId int not null,
	StartDate DateTime2 not null,
	EndDate DateTime2 ,
	foreign key (Fk_EmpId) references dbo.Tbl_Employee_master(Id)

);

select * from dbo.Tbl_Employee_master
