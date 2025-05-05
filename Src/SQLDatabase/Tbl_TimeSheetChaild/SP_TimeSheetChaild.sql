create procedure SP_TimeSheetChildInsert

	@Fk_MasterTimeSheet ,
	@JobNo varchar(20),
	@JobSequence varchar(100),
	@Part varchar(50),
	@Activity varchar(50),
	@WorkType varchar(50),
	@StartTime DateTime2,
	@EndTime DateTime2,
	@Status bit,

AS 
begin 

	insert into Tbl_TimeSheetChaild(Fk_MasterTimeSheet ,
	JobNo ,
	JobSequence ,
	Part ,
	Activity ,
	WorkType ,
	StartTime ,
	EndTime,
	Status ,)