drop table Tbl_TimeSheetChaild
create table Tbl_TimeSheetChaild(

	ChaildtimeSheetId int primary key identity(1,1),
	Fk_MasterTimeSheet int not null,
	JobNo varchar(20),
	JobSequence varchar(100),
	Part varchar(50),
	Activity varchar(50),
	WorkType varchar(50),
	StartTime DateTime2,
	EndTime DateTime2,
	Status bit,

	CreatedBy int ,
	CreatedDate DateTime2,

	UpdatedBy int,
	UpdatedDate datetime2,

	foreign key (Fk_MasterTimeSheet) references Tbl_TimeSheetMaster(TimeSheetMasterId)



);