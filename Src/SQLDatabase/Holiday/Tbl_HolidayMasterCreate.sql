
CREATE TABLE dbo.Tbl_HolidayMaster(
    HolidayId INT IDENTITY(1,1) PRIMARY KEY,

    HolidayName NVARCHAR(30) NOT NULL,
    HolidayDate DATE NOT NULL,
    HolidayListType BIT DEFAULT 1,
    HolidayStatus BIT DEFAULT 1,           

    CreatedBy INT NULL,
    CreatedDate DATETIME2(7) NULL,

    UpdatedBy INT NULL,
    UpdatedDate DATETIME2(7) NULL
);





