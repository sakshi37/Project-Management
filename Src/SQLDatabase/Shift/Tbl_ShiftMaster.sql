create table [dbo].Tbl_ShiftMaster(

	ShiftId int primary key identity(1,1) not null,
	ShiftType Varchar(20)
	 ,

    [CreatedBy] INT NULL,
    [CreatedDate] DATETIME2(7) NULL,

    [UpdatedBy] INT NULL,
    [UpdatedDate] DATETIME2(7) NULL,

    [ShiftStatus] BIT NULL,

);

