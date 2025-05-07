	create table [dbo].[Tbl_FamilyMaster](
	[FamilyId]INT IDENTITY(1,1) NOT NULL,
	[Fk_FamilyMemberTypeId] int not null,
	[Fk_Id] int not null,
	[FamilyMemberName] nchar(75),
	[BirthDate] DATE,
	[Age] int not null,
	[RelationWithEmployee] nchar(75) ,
	[CreatedBy] INT NULL,
	[CreatedDate] DATETIME2(7) NULL,
	[UpdatedBy] INT NULL,
	[UpdatedDate] DATETIME2(7) NULL,
	[FamilyStatus] BIT NULL,

	 CONSTRAINT PK_Tbl_FamilyMaster PRIMARY KEY ([FamilyId]),
	 CONSTRAINT FK_Tbl_FamilyMaster_Employee FOREIGN KEY (Fk_Id) REFERENCES Tbl_Employee_master (Id),
	 CONSTRAINT FK_Tbl_FamilyMaster_FamilyMemberTypeMaster FOREIGN KEY (Fk_FamilyMemberTypeId) REFERENCES FamilyMemberTypeMaster(FamilyMemberTypeId)
	);


	select * from dbo.FamilyMemberTypeMaster;

	drop table Tbl_FamilyMaster;