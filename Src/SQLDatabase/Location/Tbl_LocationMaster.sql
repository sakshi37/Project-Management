drop table Tbl_LocationMaster

Go

USE HrModule;
GO


create table Tbl_LocationMaster(

	LocationId int identity(1,1) ,
	LocationName NVARCHAR(20),
	
	Fk_CityId int not null,

	CreatedBy  int null,
	CreatedDate DateTime2 null,

	UpdatedBy NVARCHAR(50) null,
	UpdatedDate DateTime2 null,
	LocationStatus BiT,
	CONSTRAINT PK_Tbl_LocationMaster PRIMARY KEY (LocationId),
	constraint FK_Location_City foreign key (Fk_CityId) References	Tbl_CityMaster(CityId)
);