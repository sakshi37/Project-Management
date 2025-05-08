CREATE TABLE [dbo].[Tbl_CityMaster] (
    [CityId] INT IDENTITY(1,1) NOT NULL,
    [Fk_StateId] INT NOT NULL,                       
    [CityName] NVARCHAR(100) NULL,
    [CreatedBy] INT NULL,
    [CreatedDate] DATETIME2(7) NULL,

    [UpdatedBy] INT NULL,
    [UpdatedDate] DATETIME2(7) NULL,

    [CityStatus] BIT NULL,                       

    CONSTRAINT PK_Tbl_CityMaster PRIMARY KEY (CityId),
    CONSTRAINT FK_Tbl_CityMaster_State FOREIGN KEY (Fk_StateId)
        REFERENCES Tbl_StateMaster (StateId)
);
