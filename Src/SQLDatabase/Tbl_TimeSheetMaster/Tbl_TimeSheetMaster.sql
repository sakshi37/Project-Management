 
drop table Tbl_TimeSheetMaster

create table Tbl_TimeSheetMaster
(
	
	TimeSheetMasterId int primary key identity(1,1),
	StartDate DateTime2 not null,
	EndDate DateTime2 not null,
	Fk_EmployeeId int not null,
	Fk_JobId int not null,

	TimeSheetStatus bit,
	CreatedBy int ,
	CreatedDate DateTime2,

	UpdatedBy int,
	UpdatedDate datetime2,
	Foreign key (Fk_EmployeeId) references Tbl_EmployeeMaster(EmployeeId)

);