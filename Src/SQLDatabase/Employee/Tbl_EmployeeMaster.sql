DROP TABLE IF EXISTS Tbl_EmployeeMaster;
GO

CREATE TABLE Tbl_EmployeeMaster (
    EmployeeId INT PRIMARY KEY IDENTITY,
    EmployeeName VARCHAR(100) NOT NULL,
    Fk_BranchId INT NOT NULL,
    Address VARCHAR(250),

    Mobile VARCHAR(20),
    SkypeId VARCHAR(50),
    CcEmail VARCHAR(100),

    Fk_HeadDesignationId INT NOT NULL,
    JoinDate DATE,
    DutyHour TIME,
    LeftCompany BIT DEFAULT 0,
    LeftDate DATE,

    UserName VARCHAR(50),
    Password VARCHAR(255), 
    AadharNumber VARCHAR(12),
    EmployeeCode VARCHAR(20) UNIQUE NOT NULL,
    Fk_DesignationId INT NOT NULL,
    Fk_DivisionId INT NOT NULL,
    Fk_LocationId INT NOT NULL,

    PinCode INT NULL,

    Email VARCHAR(100),
    BccEmail VARCHAR(100),

    PANNumber VARCHAR(10),

    Fk_GenderId INT NOT NULL,

    BirthDate DATE,
    Fk_ShiftId INT NOT NULL,
    Photo VARBINARY(MAX) NULL,
    Signature VARBINARY(MAX) NULL,
    Fk_EmployeeTypeId INT NOT NULL,

    LoginStatus VARCHAR(10), 
    SignaturePath VARCHAR(255), 

    CreatedBy INT,
    CreatedDate DATETIME DEFAULT GETDATE(),

    UpdatedDate DATETIME,
    UpdatedBy INT,

    FOREIGN KEY (Fk_DivisionId) REFERENCES Tbl_DivisionMaster(DivisionId),
    FOREIGN KEY (Fk_BranchId) REFERENCES Tbl_BranchMaster(BranchId),
    FOREIGN KEY (Fk_GenderId) REFERENCES Tbl_GenderMaster(GenderId),
    FOREIGN KEY (Fk_EmployeeTypeId) REFERENCES Tbl_EmployeeTypeMaster(EmployeeTypeId),
    FOREIGN KEY (Fk_LocationId) REFERENCES Tbl_LocationMaster(LocationId),
    FOREIGN KEY (Fk_ShiftId) REFERENCES Tbl_ShiftMaster(ShiftId),
    FOREIGN KEY (Fk_DesignationId) REFERENCES Tbl_DesignationMaster(DesignationId)
   
);
