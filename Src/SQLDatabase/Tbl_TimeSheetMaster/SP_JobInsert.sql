create procedure SP_JobInsert

	@Task varchar(50)
AS
Begin

	insert into Tbl_JobMaster(Task)
	values (@Task)

end

EXEC SP_JobInsert @Task = 'UI'

select * from Tbl_JobMaster