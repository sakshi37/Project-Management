Create Table Tbl_BranchMaster(

BranchId int Identity(1,1) primary key,
BranchName NVARCHAR null,

Fk_CityId int not null,

CreatedBy  int null,
CreatedDate DateTime2 null,

UpdatedBy NVARCHAR(50) null,
UpdatedDate DateTime2 null,

constraint FK_Branch_City foreign key (Fk_CityId) References	Tbl_CityMaster(CityId)

);