drop table Tbl_CountryMaster

Go 

Create Table Tbl_CountryMaster(

 CountryId int Identity (1,1),
 CountryName NVARCHAR(100) null,
 CountryCode CHAR(3) null,
 

 CreatedBy  int null,
 CreatedDate DateTime2 null,

 UpdatedBy NVARCHAR(50) null,
 UpdatedDate DateTime2 null,

 CountryStatus BIT null,

 CONSTRAINT PK_Tbl_CountryMaster PRIMARY KEY (CountryId)

);



