
CREATE TABLE dbo.Tbl_DivisionMaster (
    DivisionId INT IDENTITY(1,1) PRIMARY KEY,
    DivisionName NVARCHAR(75) NOT NULL,
    ProjectManagerName NVARCHAR(100) NOT NULL,
    PrefixName NVARCHAR(20),
    Fk_HolidayId INT NOT NULL,                    
    ManHours FLOAT,
    DivisionStatus BIT DEFAULT 1,            
    CreatedBy NVARCHAR(50),
    CreatedDate DATETIME2(7),
    UpdatedBy NVARCHAR(50),
    UpdatedDate DATETIME2(7),

    CONSTRAINT Fk_DivisionHoliday FOREIGN KEY (Fk_HolidayId) REFERENCES Tbl_HolidayMaster(HolidayId)
);

ALTER TABLE Tbl_DivisionMaster
ADD ProjectManagerName NVARCHAR(100);

select * from Tbl_DivisionMaster
	