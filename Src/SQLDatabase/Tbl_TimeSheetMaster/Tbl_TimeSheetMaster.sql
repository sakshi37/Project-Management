 
drop table Tbl_TimeSheetMaster

create table Tbl_TimeSheetMaster
(
	
	Id int primary key identity(1,1),
	StartDate DateTime2 ,
	EndDate DateTime2 ,

	Fk_EmployeeId int not null,
	Sequence varchar(50),
	Fk_JobId int not null,

	TimeSheetStatus bit,
	CreatedBy int ,
	CreatedDate DateTime2,

	UpdatedBy int,
	UpdatedDate datetime2,
	Foreign key (Fk_EmployeeId) references Tbl_Employee_master(Id),
	foreign key (Fk_JobId) references Tbl_JobMaster(Id)


);

select * from Tbl_TimeSheetMaster

