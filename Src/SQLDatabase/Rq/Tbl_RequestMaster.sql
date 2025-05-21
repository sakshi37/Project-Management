CREATE TABLE [dbo].[Tbl_RequestMaster] (
    RequestId INT PRIMARY KEY IDENTITY(1,1),
    Fk_EmpId INT NOT NULL,            -- Employee for whom the request is made
    RequestByEmpId INT NOT NULL,      -- HR making the request
    RequestByName NVARCHAR(100),      -- Optional: HR name
    Reason NVARCHAR(200),

    RequestStatus NVARCHAR(20) DEFAULT 'Pending',  -- 'Pending', 'Approved', 'Rejected'
    ActionByEmpId INT NULL,                         

    RequestDate DATETIME DEFAULT GETDATE(),
	 ActionDate DATETIME DEFAULT GETDATE()

    CONSTRAINT FK_RequestedFor_Emp FOREIGN KEY (Fk_EmpId)
        REFERENCES dbo.Tbl_Employee_master(Id),

    CONSTRAINT FK_RequestedBy_Emp FOREIGN KEY (RequestByEmpId)
        REFERENCES dbo.Tbl_Employee_master(Id),

    CONSTRAINT FK_ActionBy_Emp FOREIGN KEY (ActionByEmpId)
        REFERENCES dbo.Tbl_Employee_master(Id)
);
	





