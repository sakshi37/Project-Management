Create table Tbl_Employee_master(
Id int primary key identity(1,1),
Name varchar(100) not null,
Code varchar(50)not null,
Address varchar(250),
MobileNo varchar(20) null,
SkypeId varchar(20) null,
JoinDate DateTime2 ,
Email varchar(50),
BccEmail varchar(50) null,
PanNumber varchar(20),
BirthDate dateTime2,
Image Image,
Signature Image,
LoginStatus bit default 0,
leftCompany bit null,
leftDate datetime2 null,


Fk_LocationId int not null,
Fk_DesignationId int not null,
Fk_ShiftId int not null,
Fk_EmployeeTypeId int not null,
Fk_UserGroupId int not null,
Fk_BranchId int not null,
Fk_DivisionId int not null,

foreign key (Fk_LocationId) references Tbl_LocationMaster(LocationId),
foreign key (Fk_DesignationId) references Tbl_DesignationMaster(DesignationId),
foreign key (Fk_ShiftId) references Tbl_ShiftMaster(ShiftId),
foreign key (Fk_EmployeeTypeId) references Tbl_EmployeeTypeMaster(EmployeeTypeId),
foreign key (Fk_UserGroupId) references Tbl_userGroupMaster(UsergroupId),
foreign key (Fk_BranchId) references Tbl_BranchMaster(BranchId),
foreign key (Fk_DivisionId) references Tbl_DivisionMaster(DivisionId)


);

ALTER TABLE Tbl_Employee_master
ADD CONSTRAINT DF_Tbl_Employee_master_LoginStatus DEFAULT 0 FOR LoginStatus;

ALTER TABLE Tbl_Employee_master
DROP CONSTRAINT DF__Tbl_Emplo__Login__7C6F7215;

alter table Tbl_Employee_master



select * from dbo.Tbl_Employee_master
 
 SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Tbl_Employee_master');

ALTER TABLE Tbl_Employee_master
DROP CONSTRAINT FK__Tbl_Emplo__Fk_Em__5006DFF2;

ALTER TABLE Tbl_Employee_master
ALTER COLUMN Fk_EmployeeTypeId INT NULL;


SELECT COLUMN_NAME, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Tbl_Employee_master' AND COLUMN_NAME = 'Fk_DesignationId';

SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'Fk_DesignationId';

