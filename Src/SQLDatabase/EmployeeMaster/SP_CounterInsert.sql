create or alter procedure SP_CounterInsert
	@Id int
as
Begin
	insert into Tbl_CountMaster(Id)
	values(@Id);
end

EXEC  SP_CounterInsert @Id = 1

select * from Tbl_CountMaster