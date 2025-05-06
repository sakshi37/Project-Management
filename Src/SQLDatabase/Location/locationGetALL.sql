create or alter procedure SP_LocationGetAll

AS 
Begin

select LocationId, LocationName  from Tbl_LocationMaster

end

EXEC SP_LocationGetAll

select * from Tbl_Employee_master