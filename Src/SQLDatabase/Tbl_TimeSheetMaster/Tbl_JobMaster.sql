drop table Tbl_JobMaster
create table dbo.Tbl_JobMaster(

	Id int primary key  identity (1,1),
	Task  varchar(50)

);

insert into dbo.Tbl_JobMaster(Task)
values('Api');