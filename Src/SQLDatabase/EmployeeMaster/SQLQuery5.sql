ALTER TABLE dbo.Tbl_Employee_master
ADD Fk_DepartmentId INT null,
CONSTRAINT Fk_Department
FOREIGN KEY (Fk_DepartmentId) REFERENCES dbo.Tbl_DepartmentMaster(DepartmentId);
