CREATE TABLE [dbo].[Tbl_StateMaster] (
    [StateId] INT IDENTITY(1,1) NOT NULL,
    [Fk_CountryId] INT NOT NULL,                               
    [StateName] NVARCHAR(100) NULL,
    [StateCode] CHAR(3) NULL,

    [CreatedBy] INT NULL,
    [CreatedDate] DATETIME2(7) NULL,

    [UpdatedBy] INT NULL,
    [UpdatedDate] DATETIME2(7) NULL,

    [StateStatus] BIT NULL,

    CONSTRAINT PK_Tbl_StateMaster PRIMARY KEY (StateId),
    CONSTRAINT FK_Tbl_StateMaster_Country FOREIGN KEY (Fk_CountryId)
        REFERENCES Tbl_CountryMaster (CountryId)
);