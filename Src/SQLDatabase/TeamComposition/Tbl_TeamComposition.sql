CREATE TABLE dbo.Tbl_TeamComposition (
    TeamId INT IDENTITY(1,1) PRIMARY KEY,
    TeamName NVARCHAR(100) NOT NULL,
    Fk_BranchId INT NOT NULL,
    Fk_DivisionId INT NOT NULL,
    Fk_TeamLeaderId INT NOT NULL,
    TeamStatus BIT DEFAULT 1,
    CreatedBy INT,
    CreatedDate DATETIME2(7),
    UpdatedBy INT,
    UpdatedDate DATETIME2(7),

    CONSTRAINT FK_Team_Branch FOREIGN KEY (Fk_BranchId) REFERENCES Tbl_BranchMaster(BranchId),
    CONSTRAINT FK_Team_Division FOREIGN KEY (Fk_DivisionId) REFERENCES Tbl_DivisionMaster(DivisionId),
    CONSTRAINT FK_Team_Leader FOREIGN KEY (Fk_TeamLeaderId) REFERENCES Tbl_Employee_master(Id)
);
