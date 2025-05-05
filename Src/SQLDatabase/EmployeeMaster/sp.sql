
Create  or alter procedure sp_Employee

	As
	Begin

	select 
			E.Id,
			E.Name, 
			E.Code, 
			E.DesignationId, 
			E.BranchId, 
			E.DivisionId,
			E.UserGroupId,
			B.BranchName
	
	from Tbl_Employee_master E
	join Tbl_BranchMaster B on E.BranchId = B.BranchId
end

insert into Tbl_Employee_master(Name, Code, DesignationId, BranchId, DivisionId, UserGroupId)
values('sakshi', 'E001', 1,1,1,1)

EXEC sp_Employee
