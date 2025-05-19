drop table dbo.Tbl_TimeSheetMaster
create table dbo.Tbl_TimeSheetMaster
(
	
	Id int primary key identity(1,1),
Fk_JobId int not null,
Sequence varchar(50),
	Part varchar(50),
	Activity varchar(20),
	Type varchar(10),
	StartTime DateTime2 ,
	EndTime DateTime2 ,
	Hrs int,
	Min int,
	Fk_EmployeeId int not null,
	

	TimeSheetStatus bit,
	CreatedBy int ,
	CreatedDate DateTime2,

	UpdatedBy int,
	UpdatedDate datetime2,
	Foreign key (Fk_EmployeeId) references dbo.Tbl_Employee_master(Id),
	foreign key (Fk_JobId) references dbo.Tbl_JobMaster(Id)


);

select * from dbo.Tbl_TimeSheetMaster

select * from dbo.Tbl_Employee_master

select * from dbo.Tbl_JobMaster