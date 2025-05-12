create table [dbo].[Tbl_BranchMaster](
[BranchId]INT IDENTITY(1,1) NOT NULL,
[Fk_CityId] int not null,
[BranchName]  nvarchar(100) Null,
[CreatedBy] INT NULL,
[CreatedDate] DATETIME2(7) NULL,
[UpdatedBy] INT NULL,
[UpdatedDate] DATETIME2(7) NULL,
[BranchStatus] BIT NULL,

 CONSTRAINT PK_Tbl_BranchMaster PRIMARY KEY (BranchId),
    CONSTRAINT FK_Tbl_BranchMaster_City FOREIGN KEY (Fk_CityId) REFERENCES Tbl_CityMaster (CityId)
);
