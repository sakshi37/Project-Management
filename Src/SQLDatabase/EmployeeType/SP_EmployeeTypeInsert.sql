create or alter procedure SP_EmployeeTypeInsert

@EmployeeType varchar(40)

AS 
Begin

Insert Into Tbl_EmployeeTypeMaster (EmployeeType)
values (@EmployeeType)

print 'Successfull';


End