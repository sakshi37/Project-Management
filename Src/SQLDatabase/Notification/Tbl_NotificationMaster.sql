CREATE TABLE [dbo].[Tbl_NotificationMaster] (
    NotificationId INT IDENTITY(1,1) PRIMARY KEY,
    Fk_EmpId INT NOT NULL,
    Subject NVARCHAR(200),
    Message NVARCHAR(MAX),
    IsRead BIT DEFAULT 0,
    IsDeleted BIT DEFAULT 0,
    CONSTRAINT FK_Notification_Emp FOREIGN KEY (Fk_EmpId)
        REFERENCES Tbl_Employee_master(Id)
);



