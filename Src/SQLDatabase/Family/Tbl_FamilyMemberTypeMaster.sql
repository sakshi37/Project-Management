create table [dbo].FamilyMemberTypeMaster(
[FamilyMemberTypeId] int IDENTITY(1,1) not null,
[FamilyMemberTypeName] Nvarchar(75),
[CreatedBy] INT NULL,
[CreatedDate] DATETIME2(7) NULL,
[UpdatedBy] INT NULL,
[UpdatedDate] DATETIME2(7) NULL,
 CONSTRAINT PK_Tbl_FamilyMemberTypeMaster PRIMARY KEY (FamilyMemberTypeId)
)
drop table  dbo.FamilyMemberTypeMaster;

insert into dbo.FamilyMemberTypeMaster (FamilyMembertypeName)
values('Guardian');
 
 select * from dbo.FamilyMemberTypeMaster ;
